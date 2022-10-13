import * as clock from "./apps/clock.js";
import * as icons from "./builders/icon.js";
import * as start from "./apps/start.js";

const setupPage = () => {
	clock.getCurrentTime();
	icons.createIcons(icons.iconList);
	start.createStart();
};

setupPage();

