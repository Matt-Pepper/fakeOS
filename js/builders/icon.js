import * as winUI from "./window.js";
import * as task from "./taskbar.js";
const windowTemplate = document.getElementById("windowUi");
const iconTemplate = document.getElementById("iconTemplate");
const taskbtnTemplate = document.getElementById("taskButton");
const iconContainer = document.getElementById("iconContainer");
let quizCount = 0;

// {name: "", icon: "", app: ""}
/**
 * create a new app by supplying an icon and creating an app function
 */
export const appType = [
	{ icon: "./static/icons/txt.png", app: "notepad" },
	{ icon: "./static/icons/folder.png", app: "pictures" },
	{ icon: "./static/icons/globe.png", app: "quiz" },
];

export const iconList = [
	{ id: 0, app: appType[0], fileName: "Notepad", content: [] },
	{ id: 1, app: appType[1], fileName: "My Pictures", content: [] },
	{ id: 2, app: appType[2], fileName: "Quiz Game", content: [] },
];

/**
 * To create a new icon, you need to supply what "app" will be opened by passing the index to the app
 * This also needs a file name to display
 * Content is for any information that needs to be saved for the app
 * @param {appType} app
 * @param {string} fileName
 * @param {array} content
 */
export const iconFactory = (app, fileName, content) => {
	const newIcon = { id: iconList.length, app: appType[app], fileName: fileName, content: content };
	iconList.push(newIcon);
	createIcon(newIcon)
};
//iconFactory(0, "Test", ["test"]);

export const createIcons = (iconList) => {
	if (!document.getElementsByClassName("desktop-icon").length) {
		for (const element of iconList) {
			createIcon(element);
		}
	}
};

const createIcon = (element) => {
	const iconClone = iconTemplate.content.firstElementChild.cloneNode(true);
	fillIcon(iconClone, element);
	iconContainer.appendChild(iconClone);

	createIconClickHandler(iconClone);
};

const fillIcon = (icon, el) => {
	const iconImg = icon.querySelector(".desktop-icon__img");
	const iconTxt = icon.querySelector(".desktop-icon__text");
	icon.setAttribute("data-id", el.id)
	iconImg.setAttribute("src", el.app.icon);
	iconTxt.textContent = el.fileName;
	iconImg.setAttribute("data-icon-id", el.id);
	iconTxt.setAttribute("data-icon-id", el.id);
};

/**
 * Creates event handlers for all icons
 * @param {*} icon
 */
const createIconClickHandler = (icon) => {
	icon.querySelector("img").addEventListener("click", addIconColor);
	icon.querySelector("img").addEventListener("dblclick", createApp);
	icon.querySelector("img").addEventListener("blur", removeIconColor);
	icon.querySelector("span").addEventListener("click", addIconColor);
	icon.querySelector("span").addEventListener("dblclick", createApp);
	icon.querySelector("span").addEventListener("blur", removeIconColor);
};

/**
 * adds a window to the page using the window template and adds a button to the task bar
 * @param {event} e
 */
const createApp = (e) => {
	const windowClone = windowTemplate.content.firstElementChild.cloneNode(true);
	const taskbarBtnClone = taskbtnTemplate.content.firstElementChild.cloneNode(true);
	const appNum = e.target.attributes.getNamedItem("data-icon-id").value;

	winUI.createWindow(windowClone, e.target, appNum);

	task.createTaskbarBtn(taskbarBtnClone, e.target);
	winUI.windowEventHandlers(windowClone, taskbarBtnClone);
};

const addIconColor = (e) => {
	e.target.parentNode
		.querySelector(".desktop-icon__text")
		.classList.toggle("desktop-icon--clicked");
	e.target.parentNode
		.querySelector(".desktop-icon__img")
		.classList.toggle("desktop-icon__img--clicked");
};
const removeIconColor = (e) => {
	e.target.parentNode
		.querySelector(".desktop-icon__text")
		.classList.remove("desktop-icon--clicked");
	e.target.parentNode
		.querySelector(".desktop-icon__img")
		.classList.remove("desktop-icon__img--clicked");
};
