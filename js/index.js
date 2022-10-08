const maximizeUI = (e) => {
	//e.target.classList.toggle('maximized');
	e.target.closest(".window-ui").classList.toggle("maximized");
};

const button = document.querySelectorAll(".titlebar__maximizeButton");
console.log(button);

for (let index = 0; index < button.length; index++) {
	button[index].addEventListener("click", maximizeUI, false);
}

//const windowUi = document.querySelectorAll('.window-ui');

const getCurrentTime = () => {
	const currentTime = Date.now();
	const time = [];
	time.push(new Date(currentTime).getHours());
	time.push(new Date(currentTime).getMinutes());

	time.push(time[0] <= 12 ? "AM" : "PM");
	if (time[0] > 12) time[0] -= 12;
	if (time[0] == 0) time[0] = 12;

	const timeString = `${time[0]}:${time[1]} ${time[2]}`;

	document.querySelector("#clockTime").textContent = timeString;
};
getCurrentTime();
setInterval(getCurrentTime, 6000);
