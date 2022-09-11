const btn = document.getElementById('audio');
const btn2 = document.getElementById('clip');

let value0 = 1;
let value1 = 1;

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