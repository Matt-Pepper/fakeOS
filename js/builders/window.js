import * as icons from "./icon.js";
import * as quiz from "../apps/quiz.js";
import * as notepad from "../apps/notepad.js";
import * as pictures from "../apps/pictures.js";

let appRows = 0;
let appCounter = 1;
let appRound = 1;

export const createWindow = (windowClone, e, appNum) => {
	const content = windowClone.querySelector(".window-ui__content");
	windowClone.querySelector(".titlebar__title").textContent =
	icons.iconList[e.attributes.getNamedItem("data-icon-id").value].fileName;
    const appType = icons.iconList[appNum].app.app;


        desktop.appendChild(windowClone);

        addApp(content, appType, icons.iconList[appNum]);
	getAppPosition(windowClone);
};

export const addApp = (parent, appNum, app) => {
	switch (appNum) {
		case "quiz":
			quiz.createQuiz(parent);
			break;
		case "pictures":
			pictures.createPics(parent);
			break;
		case "notepad":
			notepad.createNotepad(parent, app);
			break;
		default:
			break;
	}
};

const getAppPosition = (clone) => {
	if (appRows == 0) {
		if (50 + appRound * 33 < window.innerHeight / 2) {
			//let styleString = `top: ${50 + appRound * 33}px; left: ${
			//	appRound * 20 + appCounter
			//}px;`;
			//clone.setAttribute("style", styleString);
            clone.style.top = `${50 + appRound * 33}px`
            clone.style.left = `${appRound * 20 + appCounter}px`
			appRound++;
			return;
		}
		appRows++;
		appRound = 0;
		appCounter = 500;
	}
	if (appRows == 1) {
		if (50 + appRound * 33 < window.innerHeight / 2) {
			//let styleString = `top: ${50 + appRound * 33}px; left: ${
			//	appRound * 20 + appCounter
			//}px;`;
			//clone.setAttribute("style", styleString);
            clone.style.top = `${50 + appRound * 33}px`
            clone.style.left = `${appRound * 20 + appCounter}px`
			appRound++;
			return;
		}
		appRows = 0;
		appRound = 1;
		appCounter = 1;
	}
};

export const windowEventHandlers = (windowClone, taskbarBtnClone) => {
	windowClone
		.querySelector(".titlebar__maximizeButton")
		.addEventListener("click", maximizeWindow, false);
	windowClone
		.querySelector(".titlebar__closeButton")
		.addEventListener("click", () => windowClone.remove());
	windowClone
		.querySelector(".titlebar__closeButton")
		.addEventListener("click", () => taskbarBtnClone.remove());

	$(function () {
		$(windowClone).draggable({
			stack: ".window-ui",
			handle: ".titlebar",
		});
	});
};

/**
 * toggles a window from being normal and maximized
 * @param {event} e
 */
const maximizeWindow = (e) => {
	e.target.closest(".window-ui").classList.toggle("maximized");
	e.target.closest(".window-ui").removeAttribute("style");

	if (e.target.parentNode.querySelector(".fa-window-restore")) {
		e.target.parentNode.querySelector(".closeButton").classList.remove("fa-window-restore");
		e.target.parentNode.querySelector(".closeButton").classList.add("fa-window-maximize");
	} else if (e.target.parentNode.querySelector(".fa-window-maximize")) {
		e.target.parentNode.querySelector(".closeButton").classList.remove("fa-window-maximize");
		e.target.parentNode.querySelector(".closeButton").classList.add("fa-window-restore");
	}
};
