import * as icons from "./icon.js";
import * as start from "../apps/start.js";

const taskbar = document.getElementById("taskbarBtns");
export const createTaskbarBtn = (taskbarBtn, e) => {
	taskbarBtn
		.querySelector("img")
		.setAttribute(
			"src",
			icons.iconList[e.attributes.getNamedItem("data-icon-id").value].app.icon
		);
	taskbarBtn.querySelector("div").textContent =
		icons.iconList[e.attributes.getNamedItem("data-icon-id").value].fileName;
	taskbar.appendChild(taskbarBtn);
};

const startEvents = () => {
	const startBtn = document.querySelector(".taskbar__start");

	startBtn.addEventListener("click", start.toggleStart);
};
startEvents();
