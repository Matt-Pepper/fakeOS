import * as clock from "./apps/clock.js";
import * as icons from "./builders/icon.js";

const setupPage = () => {
	clock.getCurrentTime();
	icons.createIcons(icons.iconList);
};

setupPage();
