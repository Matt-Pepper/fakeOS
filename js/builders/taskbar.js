import * as icons from "./icon.js";

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
