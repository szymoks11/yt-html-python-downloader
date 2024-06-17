import os
from tkinter import filedialog
from pytube import YouTube
import eel
import av
from settings import dark_theme_setting

eel.init("web")

CHAR_TO_REPLACE = {
    "#": "", "%": "", "{": "", "}": "", "<": "", ">": "",
    "*": "", ".": "", "?": "", "/": "", "$": "", "!": "",
    "\\": "", "'": "", '"': "", ":": "", "@": "", "+": "",
    "`": "", "|": "", "=": "",
}

def sanitize_filename(name):
    for char, replacement in CHAR_TO_REPLACE.items():
        name = name.replace(char, replacement)
    return name

def download_audio(yt, path, final_name):
    audio = yt.streams.filter(only_audio=True).first()
    audio.download(filename=os.path.join(path, final_name))
    return audio

def merge_audio_video(video_path, audio_path, output_path):
    input_video = av.open(video_path)
    input_audio = av.open(audio_path)
    output = av.open(output_path, mode='w')

    video_stream = input_video.streams.video[0]
    audio_stream = input_audio.streams.audio[0]

    output_video_stream = output.add_stream(template=video_stream)
    output_audio_stream = output.add_stream(template=audio_stream)

    for packet in input_video.demux(video_stream):
        if packet.dts is None:
            continue
        packet.stream = output_video_stream
        output.mux(packet)

    for packet in input_audio.demux(audio_stream):
        if packet.dts is None:
            continue
        packet.stream = output_audio_stream
        output.mux(packet)

    output.close()
    input_video.close()
    input_audio.close()

@eel.expose
def add(data_1, audio, name_data, output_data, Global_res):
    print(Global_res)
    link = str(data_1)
    custom_name = str(name_data)
    yt = YouTube(link)
    name = sanitize_filename(str(yt.title))
    path = output_data + "/" if output_data else './output/'
    final_name = name + ".mp4"
    
    audio_true = audio % 2

    if audio_true != 0:
        if not os.path.exists(path):
            os.mkdir("output")

        yt.streams.filter(adaptive=True, file_extension="webm", res=str(Global_res)).last().download(filename="video.webm")
        download_audio(yt, './', "audio.mp4")

        merge_audio_video("video.webm", "audio.mp4", "output.mp4")
        os.remove("video.webm")
        os.remove("audio.mp4")

        if custom_name:
            os.replace("output.mp4", path + custom_name + ".mp4")
        else:
            os.replace("output.mp4", path + final_name)

    elif audio_true == 0:
        download_audio(yt, path, final_name)
        if not os.path.exists(path):
            os.mkdir("output")
        os.replace(final_name, path + final_name)
        if custom_name:
            os.replace(path + final_name, path + custom_name + ".mp4")

@eel.expose
def browse_button():
    return filedialog.askdirectory()

@eel.expose
def dark_theme(dark_theme_counter):
    theme = 'dark' if dark_theme_counter % 2 != 0 else 'light'
    with open("settings.py", "w") as f:
        f.write(f"dark_theme_setting = '{theme}'")

@eel.expose
def theme_setting():
    return dark_theme_setting

@eel.expose
def quality_list(quality):
    yt = YouTube(str(quality))
    video_resolutions = [stream.resolution for stream in yt.streams.order_by('resolution')]
    result = list(dict.fromkeys(video_resolutions))
    print(result)
    return result

eel.start("index.html", size=(500, 421))
