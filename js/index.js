const windowUi = document.querySelectorAll(".window-ui");
const desktop = document.querySelector("#desktop");
const windowTemplate = document.getElementById("windowUi");
const iconTemplate = document.getElementById("iconTemplate");
const iconContainer = document.getElementById("iconContainer");

// {name: "", icon: "", app: ""}
const appType = [
	{ icon: "./static/icons/txt.png", app: "notepad" },
	{ icon: "./static/icons/folder.png", app: "documents" },
	{ icon: "./static/icons/globe.png", app: "quiz" },
];

const iconList = [
	{ app: appType[0], fileName: "Notepad", content: [] },
	{ app: appType[1], fileName: "My Documents", content: [] },
	{ app: appType[2], fileName: "Quiz Game", content: [] },
];

const iconFactory = (app, fileName, content) => {
	iconList.push({ app: app, fileName: fileName, content: content });
};

/**
 * creates all events for each title for every window
 */
const createTitleBarEvents = () => {
	const maximizeButton = document.querySelectorAll(".titlebar__maximizeButton");
	const closeButton = document.querySelectorAll(".titlebar__closeButton");
	for (let i = 0; i < maximizeButton.length; i++) {
		maximizeButton[i].addEventListener("click", maximizeWindow, false);
		closeButton[i].addEventListener("click", closeWindow, false);
	}
};

/**
 * toggles a window from being normal and maximized
 * @param {event} e
 */
const maximizeWindow = (e) => {
	//e.target.classList.toggle('maximized');
	e.target.closest(".window-ui").classList.toggle("maximized");
	e.target.closest(".window-ui").removeAttribute("style");

	e.target.parentNode.querySelector("i").classList.toggle("fa-window-maximize");
	e.target.parentNode.querySelector("i").classList.toggle("fa-window-restore");
};

/**
 * closes a window
 * @param {event} e
 */
const closeWindow = (e) => {
	e.target.closest(".window-ui").remove();
};

/**
 * Creates event handlers for all icons
 * @param {*} icon
 */
const createIconClickHandler = (icon) => {
	console.log(icon);
	//icon[i].childNodes
	for (let i = 0; i < icon.length; i++) {
		if (icon[i].hasChildNodes()) {
			icon[i].querySelector("img").addEventListener("click", addIconColor);
			icon[i].querySelector("img").addEventListener("dblclick", createWindow);
			icon[i].querySelector("img").addEventListener("blur", removeIconColor);
			icon[i].querySelector("span").addEventListener("click", addIconColor);
			icon[i].querySelector("span").addEventListener("dblclick", createWindow);
			icon[i].querySelector("span").addEventListener("blur", removeIconColor);
		}
	}
};

const addIconColor = (e) => {
	//console.log(e.target);
	e.target.parentNode
		.querySelector(".desktop-icon__text")
		.classList.toggle("desktop-icon--clicked");
	e.target.parentNode
		.querySelector(".desktop-icon__img")
		.classList.toggle("desktop-icon__img--clicked");
};
const removeIconColor = (e) => {
	//console.log(e.target);
	e.target.parentNode
		.querySelector(".desktop-icon__text")
		.classList.remove("desktop-icon--clicked");
	e.target.parentNode
		.querySelector(".desktop-icon__img")
		.classList.remove("desktop-icon__img--clicked");
};

/**
 * Creates a new window on clicking an icon
 * @param {event} e
 */
const createWindow = (e) => {
	const windowClone = windowTemplate.content.firstElementChild.cloneNode(true);
	windowClone.querySelector(".titlebar__title").textContent = "Hello";
	desktop.appendChild(windowClone);

	createTitleBarEvents();
};

const createIcons = (iconList) => {
	iconList.forEach((element) => {
		//windowClone.querySelector(".titlebar__title").textContent = "Hello";
		//desktop.appendChild(windowClone);

		const iconClone = iconTemplate.content.firstElementChild.cloneNode(true);
		fillIcon(iconClone, element);
		iconContainer.appendChild(iconClone);
	});
	const icon = document.querySelectorAll(".desktop-icon");
	createIconClickHandler(icon);
};

const fillIcon = (icon, el) => {
    console.log(icon);
	icon.querySelector(".desktop-icon__img").setAttribute("src", el.app.icon);
	icon.querySelector(".desktop-icon__text").textContent = el.fileName;
};
createIcons(iconList);

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
