const btn = document.getElementById('audio');
const btn2 = document.getElementById('clip');
const btn3 = document.getElementById('dark_theme_icon')

let value0 = 1;
let value1 = 1;
let dark_theme_counter = 1;


async function check_theme() {
	const data = await eel.theme_setting()();;
	if (data == "dark") {
		myFunction()
	} 
	else if (data == "light"){
	} 
  }
  
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
}

function call_Back(file_path) {
	document.getElementById("output-directory").value = file_path
}
document.getElementById("Download-button").onclick = function summation() {
	var data_1 = document.getElementById("link").value;
	var start_data = document.getElementById("start_input").value;
	var stop_data = document.getElementById("stop_input").value;
	var name_data = document.getElementById("name_input").value;
	var output_data = document.getElementById("output-directory").value;
	eel.add(data_1, value0, value1, start_data, stop_data, name_data, output_data);

}


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
	element.classList.toggle("dark-mode");
	clip.classList.toggle("dark");
	audio.classList.toggle("dark");
	browse.classList.toggle("dark");
	link.classList.toggle("dark");
	start.classList.toggle("dark");
	stop.classList.toggle("dark");
	name.classList.toggle("dark");
	output.classList.toggle("dark");
		
}