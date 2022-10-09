const maximizeWindow = (e) => {
	//e.target.classList.toggle('maximized');
	e.target.closest(".window-ui").classList.toggle("maximized");
	e.target.closest(".window-ui").removeAttribute("style");
    
    e.target.parentNode.querySelector("i").classList.toggle("fa-window-maximize");
    e.target.parentNode.querySelector("i").classList.toggle("fa-window-restore");
};

const closeWindow = (e) => {
    e.target.closest(".window-ui").remove();
}


const createTitleBarEvents = () => {
    const maximizeButton = document.querySelectorAll(".titlebar__maximizeButton");
    const closeButton = document.querySelectorAll(".titlebar__closeButton");
    for (let i = 0; i < maximizeButton.length; i++) {
        maximizeButton[i].addEventListener("click", maximizeWindow, false);
        closeButton[i].addEventListener("click", closeWindow, false);
    }
}

const windowUi = document.querySelectorAll('.window-ui');

const getCurrentTime = () => {
	const currentTime = Date.now();
	const time = [];
	time.push(new Date(currentTime).getHours());
	time.push(new Date(currentTime).getMinutes());

	time.push(time[0] <= 12 ? "AM" : "PM");
	if (time[0] > 12) time[0] -= 12;
	if (time[0] == 0) time[0] = 12;
    if (time[1] < 10) time[1] = `0${time[1]}` 

	const timeString = `${time[0]}:${time[1]} ${time[2]}`;

	document.querySelector("#clockTime").textContent = timeString;
};
getCurrentTime();
setInterval(getCurrentTime, 6000);


const icon = document.querySelectorAll(".desktop-icon");
const desktop = document.querySelector("#desktop");
const windowTemplate = document.getElementById("windowUi");

const createIconClickHandler = (icon) => {
    for (let i = 0; i < icon.length; i++) {
        icon[i].addEventListener("click", changeIconColor);
        icon[i].addEventListener("dblclick", createWindow);

    }
}

const createWindow = (e) => {
    const windowClone = windowTemplate.content.firstElementChild.cloneNode(true);

    desktop.appendChild(windowClone);
    
    createTitleBarEvents();

}

const changeIconColor = (e) => {
    e.target.parentNode.querySelector(".desktop-icon__text").classList.toggle("desktop-icon--clicked");
    e.target.parentNode.querySelector(".desktop-icon__img").classList.toggle("desktop-icon__img--clicked");
}
createIconClickHandler(icon);