const btn = document.getElementById('audio');
const btn2 = document.getElementById('clip');
const btn3 = document.getElementById('dark_theme_icon');
const btn4 = document.getElementsByClassName('btn4');

let audio = 1;
let dark_theme_counter = 1;
let Global_res = 1;

async function check_theme() {
    const data = await eel.theme_setting()();
    if (data === "dark") {
        myFunction();
    }
};

check_theme();

btn.addEventListener('click', () => {
    btn.classList.toggle('color');
    audio += 1;
    return audio;
});

btn3.addEventListener('click', () => {
    async function check_if_settings() {
        const data = await eel.theme_setting()();
        dark_theme_counter += 1;
        eel.dark_theme(dark_theme_counter);
        return dark_theme_counter;
    };
    check_if_settings();
});

async function getResult() {
    const output_data = document.getElementById("output-directory").value;
    await eel.browse_button()(call_Back);
}

function call_Back(file_path) {
    document.getElementById("output-directory").value = file_path;
}

function call_back_quality(result) {
    let quality = 1;
    quality = result;
    const choose_quality = document.getElementsByClassName("dropdown-content");
    
    Array.from(choose_quality).forEach(element => {
        element.addEventListener("click", event => {
            result = event.target.innerHTML;
            Global_res = result;
        });
    });

    const qualityIds = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "4320p"];
    qualityIds.forEach((id, index) => {
        const element = document.getElementById(id);
        if (quality[index] === undefined) {
            element.classList.add('hidden');
            element.classList.remove('visible');
        } else {
            element.classList.add('visible');
            element.classList.remove('hidden');
            element.innerHTML = quality[index];
            Global_res = id;
        }
    });
}

document.getElementById("Download-button").onclick = function summation() {
    const data_1 = document.getElementById("link").value;
    const name_data = document.getElementById("name_input").value;
    const output_data = document.getElementById("output-directory").value;
    eel.add(data_1, audio, name_data, output_data, Global_res);
};

const expandSection = (sectionName) => {
    const root = document.getElementById(`section-${sectionName}`);
    const chevron = root.querySelector('.header img');
    const content = root.querySelector('.content');

    if (root.getAttribute('data-expanded') === null) {
        chevron.style.transform = 'rotate(0deg)';
        content.style.display = 'block';
        root.setAttribute('data-expanded', '');
    } else {
        chevron.style.transform = 'rotate(180deg)';
        content.style.display = 'none';
        root.removeAttribute('data-expanded');
    }
};

function myFunction() {
    const elementsToToggle = [
        document.body, 
        document.getElementById("audio"),
        document.getElementById("output-directory-search"),
        document.getElementById("link"),
        document.getElementById("start_input"),
        document.getElementById("stop_input"),
        document.getElementById("name_input"),
        document.getElementById("output-directory"),
        document.getElementById("dropbtn")
    ];
    
    elementsToToggle.forEach(element => {
        element.classList.toggle("dark-mode");
        element.classList.toggle("dark");
    });
}
