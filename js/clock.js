/**
 * Gets current time and displays it in the clock element
 */
 const getCurrentTime = () => {
	const currentTime = Date.now();
	const time = [];
	time.push(new Date(currentTime).getHours());
	time.push(new Date(currentTime).getMinutes());

	time.push(time[0] <= 12 ? "AM" : "PM");
	if (time[0] > 12) time[0] -= 12;
	if (time[0] == 0) time[0] = 12;
	if (time[1] < 10) time[1] = `0${time[1]}`;

	const timeString = `${time[0]}:${time[1]} ${time[2]}`;

	document.querySelector("#clockTime").textContent = timeString;
};
getCurrentTime();
setInterval(getCurrentTime, 6000);
