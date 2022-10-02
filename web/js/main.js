const btn = document.getElementById('audio');
const btn2 = document.getElementById('clip');
const btn3 = document.getElementById('dark_theme_icon')
const btn4 = document.getElementsByClassName('btn4')

let value0 = 1;
let value1 = 1;
let dark_theme_counter = 1;


async function check_theme() {
	const data = await eel.theme_setting()();
	if (data == "dark") {
		myFunction()
	}
	else if (data == "light") {
	}
};

check_theme();

btn.addEventListener('click', function onClick() {
	btn.classList.toggle('color');
	value0 += 1;
	return value0;
});
btn2.addEventListener('click', function onClick() {
	btn2.classList.toggle('color');
	value1 += 1;
	return value1;
});

btn3.addEventListener('click', function onClick() {
	async function check_if_settings() {
		const data = await eel.theme_setting()();;
		if (data == "dark") {
			dark_theme_counter += 1;
			eel.dark_theme(dark_theme_counter);
			return dark_theme_counter;
		}
		else if (data == "light") {
			let dark_theme_counter = 0;
			dark_theme_counter += 1;
			eel.dark_theme(dark_theme_counter);
			return dark_theme_counter;

		};
	};
	check_if_settings();
});



async function getResult() {
	var output_data = document.getElementById("output-directory").value;
	var function0 = await eel.browse_button()(call_Back);
};

function call_Back(file_path) {
	document.getElementById("output-directory").value = file_path
};

function call_back_quality(result) {
	let quality = 1;
	quality = result;
	document.getElementById("144p").innerHTML = quality[0];
	document.getElementById("240p").innerHTML = quality[1];
	document.getElementById("360p").innerHTML = quality[2];
	document.getElementById("480p").innerHTML = quality[3];
	document.getElementById("720p").innerHTML = quality[4];
	document.getElementById("1080p").innerHTML = quality[5];
	document.getElementById("1440p").innerHTML = quality[6];
	document.getElementById("2160p").innerHTML = quality[7];
	document.getElementById("4320p").innerHTML = quality[8];
	if (quality[8] == undefined) {
		document.getElementById("4320p").classList.add('hidden');
		document.getElementById("4320p").classList.remove('visible');
	}
	if (quality[7] == undefined) {
		document.getElementById("2160p").classList.add('hidden');
		document.getElementById("2160p").classList.remove('visible');
	}
	if (quality[6] == undefined) {
		document.getElementById("1440p").classList.add('hidden');
		document.getElementById("1440p").classList.remove('visible');
	}
	if (quality[5] == undefined) {
		document.getElementById("1080p").classList.add('hidden');
		document.getElementById("1080p").classList.remove('visible');
	}
	if (quality[4] == undefined) {
		document.getElementById("720p").classList.add('hidden');
		document.getElementById("720p").classList.remove('visible');
	}
	if (quality[3] == undefined) {
		document.getElementById("480p").classList.add('hidden');
		document.getElementById("480p").classList.remove('visible');
	}
	if (quality[2] == undefined) {
		document.getElementById("360p").classList.add('hidden');
		document.getElementById("360p").classList.remove('visible');
	}
	if (quality[1] == undefined) {
		document.getElementById("280p").classList.add('hidden');
		document.getElementById("280p").classList.remove('visible');
	}
	if (quality[0] == undefined) {
		document.getElementById("144p").classList.add('hidden');
		document.getElementById("144p").classList.remove('visible');
	}
	if (quality[8] != undefined) {
		document.getElementById("4320p").classList.add('visible');
		document.getElementById("4320p").classList.remove('hidden');
	}
	if (quality[7] != undefined) {
		document.getElementById("2160p").classList.add('visible');
		document.getElementById("2160p").classList.remove('hidden');
	}
	if (quality[6] != undefined) {
		document.getElementById("1440p").classList.add('visible');
		document.getElementById("1440p").classList.remove('hidden');
	}
	if (quality[5] != undefined) {
		document.getElementById("1080p").classList.add('visible');
		document.getElementById("1080p").classList.remove('hidden');
	}
	if (quality[4] != undefined) {
		document.getElementById("720p").classList.add('visible');
		document.getElementById("720p").classList.remove('hidden');
	}
	if (quality[3] != undefined) {
		document.getElementById("480p").classList.add('visible');
		document.getElementById("480p").classList.remove('hidden');
	}
	if (quality[2] != undefined) {
		document.getElementById("360p").classList.add('visible');
		document.getElementById("360p").classList.remove('hidden');
	}
	if (quality[1] != undefined) {
		document.getElementById("280p").classList.add('visible');
		document.getElementById("280p").classList.remove('hidden');
	}
	if (quality[0] != undefined) {
		document.getElementById("144p").classList.add('visible');
		document.getElementById("144p").classList.remove('hidden');
	}
	var choose_quality = document.getElementsByClassName("dropdown-content");
	for (var i = 0; i < choose_quality.length; i++) {
		choose_quality[i].addEventListener("click", function (event) {
			console.log(event.target.innerHTML);
			res = event.target.innerHTML;
			Global_res = res;
		});
	};
};

document.getElementById("Download-button").onclick = function summation() {
	var data_1 = document.getElementById("link").value;
	var start_data = document.getElementById("start_input").value;
	var stop_data = document.getElementById("stop_input").value;
	var name_data = document.getElementById("name_input").value;
	var output_data = document.getElementById("output-directory").value;
	eel.add(data_1, value0, value1, start_data, stop_data, name_data, output_data, Global_res);

};


const expandSection = (sectionName) => {
	const root = document.getElementById(`section-${sectionName}`);
	const chevron = root.querySelector('.header img');
	const content = root.querySelector(`.content`);

	if (root.getAttribute('data-expanded') === null) {
		// Show the section
		chevron.style.transform = 'rotate(0deg)';
		content.style.display = 'block';
		root.setAttribute('data-expanded', '');
	} else {
		// Hide the section
		chevron.style.transform = 'rotate(180deg)';
		content.style.display = 'none';
		root.removeAttribute('data-expanded');
	}
};
function myFunction() {
	var element = document.body;
	var clip = document.getElementById("clip");
	var audio = document.getElementById("audio");
	var browse = document.getElementById("output-directory-search");
	var link = document.getElementById("link");
	var start = document.getElementById("start_input");
	var stop = document.getElementById("stop_input");
	var name = document.getElementById("name_input");
	var output = document.getElementById("output-directory");
	var quality = document.getElementById("dropbtn");
	element.classList.toggle("dark-mode");
	clip.classList.toggle("dark");
	audio.classList.toggle("dark");
	browse.classList.toggle("dark");
	link.classList.toggle("dark");
	start.classList.toggle("dark");
	stop.classList.toggle("dark");
	name.classList.toggle("dark");
	output.classList.toggle("dark");
	quality.classList.toggle("dark");
};
