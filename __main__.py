import os
from tkinter import filedialog
from pytube import YouTube
import ffmpeg

import eel
eel.init("web")


@eel.expose
def add(data_1, value0, value1, start_data, stop_data, name_data, output_data):
    link = str(data_1)
    start = str(start_data)
    stop = str(stop_data)
    custom_name = str(name_data)
    yt_video = link
    yt = YouTube(yt_video)
    name = str(yt.title)
    if not output_data:
        path = "./output/"
    else:
        path = output_data + "/"
    value0_true = value0 % 2
    value1_true = value1 % 2
    char_to_replace = {
        "#": "",
        "%": "",
        "{": "",
        "}": "",
        "<": "",
        ">": "",
        "*": "",
        ".": "",
        "?": "",
        "/": "",
        "$": "",
        "!": "",
        "\\": "",
        """'""": "",
        '''"''': "",
        ":": "",
        "@": "",
        "+": "",
        "`": "",
        "|": "",
        "=": "",
    }
    lista_audio = [str(yt.streams.filter(only_audio=True).all()[-1])]
    x = lista_audio[0].split('itag="', 1)
    itag_audio = x[1][:3].split('", 1')
    audio = yt.streams.get_by_itag(int(itag_audio[0]))
    file_exists = os.path.exists(path)

    for key, value in char_to_replace.items():
        name = name.replace(key, value)
    final_name = name + ".mp4"
    if value0_true != 0 and value1_true != 0:
        if file_exists == True:
            pass
        elif file_exists == False:
            os.mkdir("output")
        video = yt.streams.first()
        video = (
            yt.streams.filter(adaptive=True, file_extension="mp4")
            .order_by("resolution")
            .desc()
            .first()
            .download(filename="video.mp4")
        )
        audio.download(filename="audio.mp4")

        input_video = ffmpeg.input("video.mp4")

        input_audio = ffmpeg.input("audio.mp4")

        ffmpeg.concat(input_video, input_audio, v=1, a=1).output(
            path + final_name
        ).run()

        os.remove("video.mp4")
        os.remove("audio.mp4")
        if custom_name == "":
            pass
        else:
            os.replace(path + final_name, path + custom_name)

    elif value0_true == 0 and value1_true == 0:
        if file_exists == True:
            pass
        elif file_exists == False:
            os.mkdir("output")
        audio.download(filename="audio.mp4")
        command = (
            "ffmpeg -fflags +discardcorrupt -ss "
            + start
            + " -i audio.mp4"
            + " -c:v copy -to "
            + stop
            + " -c:a copy "
            + os.path.join(path, "clip.mp4")
        )
        os.system(command)
        os.remove("audio.mp4")
        if custom_name == "":
            os.replace(path + "clip.mp4", path + final_name)
        else:
            os.replace(path + "clip.mp4", path + custom_name)
    elif value0_true == 0:
        audio.download(filename=final_name)
        if file_exists == True:
            os.replace(final_name, path + final_name)
        elif file_exists == False:
            os.mkdir("output")
            os.replace(final_name, path + final_name)
        if custom_name == "":
            pass
        else:
            os.replace(path + final_name, path + custom_name)

    elif value1_true == 0:
        if file_exists == True:
            pass
        elif file_exists == False:
            os.mkdir("output")
        video = yt.streams.first()
        video = (
            yt.streams.filter(adaptive=True, file_extension="mp4")
            .order_by("resolution")
            .desc()
            .first()
            .download(filename="video.mp4")
        )
        audio.download(filename="audio.mp4")

        input_video = ffmpeg.input("video.mp4")

        input_audio = ffmpeg.input("audio.mp4")

        ffmpeg.concat(input_video, input_audio, v=1, a=1).output(
            path + final_name
        ).run()

        os.remove("video.mp4")
        os.remove("audio.mp4")
        command = (
            "ffmpeg -fflags +discardcorrupt -ss "
            + start
            + " -i " + os.path.join(path, final_name)
            + " -c:v copy -to "
            + stop
            + " -c:a copy "
            + os.path.join(path, "clip.mp4")
        )
        os.system(command)
        os.remove(path+final_name)
        if custom_name == "":
            os.replace(path + "clip.mp4", path + final_name)
        else:
            os.replace(path + "clip.mp4", path + custom_name)


@eel.expose
def browse_button():
    file_path = filedialog.askdirectory()
    return file_path


eel.start("index.html", size=(500, 401))
