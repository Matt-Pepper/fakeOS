const windowTemplate = document.getElementById("windowUi");
const iconTemplate = document.getElementById("iconTemplate");
const taskbtnTemplate = document.getElementById("taskButton");
const taskbar = document.getElementById("taskbarBtns");
const windowUi = document.querySelectorAll(".window-ui");
const desktop = document.querySelector("#desktop");
const iconContainer = document.getElementById("iconContainer");


const openApps = [];

const appFactory = (window, tab) => {
    openApps.push({ })
}

// {name: "", icon: "", app: ""}
/**
 * create a new app by supplying an icon and creating an app function
 */
const appType = [
	{ icon: "./static/icons/txt.png", app: "notepad" },
	{ icon: "./static/icons/folder.png", app: "documents" },
	{ icon: "./static/icons/globe.png", app: "quiz" },
];

const iconList = [
	{ id: 0, app: appType[0], fileName: "Notepad", content: [] },
	{ id: 1, app: appType[1], fileName: "My Documents", content: [] },
	{ id: 2, app: appType[2], fileName: "Quiz Game", content: [] },
];

const iconFactory = (app, fileName, content) => {
	iconList.push({ id: iconList.length, app: appType[app], fileName: fileName, content: content });
};
//iconFactory(1, "a", []);

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
	for (let i = 0; i < icon.length; i++) {
		if (icon[i].hasChildNodes()) {
			icon[i].querySelector("img").addEventListener("click", addIconColor);
			icon[i].querySelector("img").addEventListener("dblclick", createApp);
			icon[i].querySelector("img").addEventListener("blur", removeIconColor);
			icon[i].querySelector("span").addEventListener("click", addIconColor);
			icon[i].querySelector("span").addEventListener("dblclick", createApp);
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
	windowClone.querySelector(".titlebar__title").textContent = iconList[e.target.attributes.getNamedItem("data-icon-id").value].fileName;
	desktop.appendChild(windowClone);
    console.log(windowClone);
    createTaskbarBtn(e);
	createTitleBarEvents();
    openApps.push({window: windowClone});
    console.log(openApps);
};

const createApp = e => {
    //  Creates window
    const windowClone = windowTemplate.content.firstElementChild.cloneNode(true);
	windowClone.querySelector(".titlebar__title").textContent = iconList[e.target.attributes.getNamedItem("data-icon-id").value].fileName;
	desktop.appendChild(windowClone);
    //  Creates tabs
    const taskbarBtnClone = taskbtnTemplate.content.firstElementChild.cloneNode(true);
    taskbarBtnClone.querySelector("img").setAttribute("src", iconList[e.target.attributes.getNamedItem("data-icon-id").value].app.icon);
    taskbarBtnClone.querySelector("div").textContent = iconList[e.target.attributes.getNamedItem("data-icon-id").value].fileName;
    taskbar.appendChild(taskbarBtnClone);

    //  Event Listeners
    windowClone.querySelector(".titlebar__maximizeButton").addEventListener("click", maximizeWindow, false);
    windowClone.querySelector(".titlebar__closeButton").addEventListener("click", () => windowClone.remove());
    windowClone.querySelector(".titlebar__closeButton").addEventListener("click", () => taskbarBtnClone.remove());

}

const createTaskbarBtn = (e) => {
//const taskbtnTemplate = document.getElementById("taskButton");
//const taskbar = document.getElementById("taskbarBtns");
    const taskbarBtnClone = taskbtnTemplate.content.firstElementChild.cloneNode(true);
    taskbarBtnClone.querySelector("img").setAttribute("src", iconList[e.target.attributes.getNamedItem("data-icon-id").value].app.icon);
    taskbarBtnClone.querySelector("div").textContent = iconList[e.target.attributes.getNamedItem("data-icon-id").value].fileName;
    taskbar.appendChild(taskbarBtnClone);

}

const createIcons = (iconList) => {
	iconList.forEach((element) => {
		const iconClone = iconTemplate.content.firstElementChild.cloneNode(true);
		fillIcon(iconClone, element);
		iconContainer.appendChild(iconClone);
	});
	const icon = document.querySelectorAll(".desktop-icon");
	createIconClickHandler(icon);
};

const fillIcon = (icon, el) => {
	icon.querySelector(".desktop-icon__img").setAttribute("src", el.app.icon);
	icon.querySelector(".desktop-icon__text").textContent = el.fileName;
	icon.querySelector(".desktop-icon__img").setAttribute("data-icon-id", el.id);
	icon.querySelector(".desktop-icon__text").setAttribute("data-icon-id", el.id);
};
createIcons(iconList);
