import * as icons from "../builders/icon.js";

const notepadTemplate = document.getElementById("notepadTemplate");

export const createNotepad = (parent, app) => {
	const notepadClone = notepadTemplate.content.firstElementChild.cloneNode(true);
	notepadClone.querySelector(".notepad__save").addEventListener("click", () => {
        
        
        saveNotepad(app, notepadClone)
    });
	//console.log(app);
	if (app.content) {
		notepadClone.querySelector(".notepad__text").textContent = app.content;
	}
	parent.appendChild(notepadClone);
};

const saveNotepad = (file, clone) => {
    const content = clone.querySelector(".notepad__text")
    const fileName = clone.querySelector(".notepad__filename")
    console.log(file)
    if(file.id === 0) {
    icons.iconFactory(0, fileName.value, [content.value]);
    } else {
        file.fileName = fileName.value;
        file.content = content.value;
        content.textContent = content.value;
        fileName.textContent = fileName.value;
        
    }
    //console.log(icons.iconList)

};

const deleteNotepad = (file) => {};
