const startButtons = [
	{ name: "Programs", img: "./static/icons/programs.png" },
	{ name: "Documents", img: "./static/icons/documents.png" },
	{ name: "Settings", img: "./static/icons/settings.png" },
	{ name: "Find", img: "./static/icons/find.png" },
	{ name: "Help", img: "./static/icons/help.png" },
	{ name: "Run", img: "./static/icons/run.png" },
	{ name: "Shut Down ...", img: "./static/icons/shutdown.png" },
];

const startContainer = document.getElementById("startMenu");
const startTemplate = document.getElementById("startMenuTemplate");
const menuTemplate = document.getElementById("startItemTemplate");
const startButton = document.getElementById("taskbarStart");

export const createStart = () => {
	const startMenu = startTemplate.content.firstElementChild.cloneNode(true);
	startContainer.appendChild(startMenu);

	for (const element of startButtons) {
		const menuItem = menuTemplate.content.firstElementChild.cloneNode(true);
		menuItem.querySelector(".start-menu__img").setAttribute("src", element.img);
		menuItem.querySelector(".start-menu__text").textContent = element.name;
        startMenu.querySelector(".start-menu__buttons").appendChild(menuItem)
	}
    document.querySelector(".desktop").addEventListener("click", removeStart);
};

export const toggleStart = () => {
    document.querySelector(".start-menu").classList.toggle("start-menu--hidden");
};

export const removeStart = (e) => {
    const startMenu = document.querySelector(".start-menu");
    //console.log(startMenu)
    if(!startMenu.contains(e.target) && !startButton.contains(e.target))
    document.querySelector(".start-menu").classList.add("start-menu--hidden");
};
