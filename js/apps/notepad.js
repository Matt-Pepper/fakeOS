import * as icons from "../builders/icon.js";

const notepadTemplate = document.getElementById("notepadTemplate");

export const createNotepad = (parent, app) => {
	const notepadClone = notepadTemplate.content.firstElementChild.cloneNode(true);
	notepadClone.querySelector(".notepad__save").addEventListener("click", () => {
        saveNotepad(app, notepadClone)
    });
	notepadClone.querySelector(".notepad__delete").addEventListener("click", () => {
        deleteNotepad(app)
    });

	if (app.content) {
		notepadClone.querySelector(".notepad__text").textContent = app.content;
	}
	parent.appendChild(notepadClone);
};

const saveNotepad = (file, clone) => {
    const content = clone.querySelector(".notepad__text")
    const fileName = clone.querySelector(".notepad__filename")
    if(file.id === 0) {
    icons.iconFactory(0, fileName.value, [content.value]);
    } else {
        file.fileName = fileName.value;
        file.content = content.value;
        content.textContent = content.value;
        fileName.textContent = fileName.value;
        
    }
};

const deleteNotepad = (file) => {
    if(file.id === 0){
        return;
    }
    document.querySelector(`[data-id="${file.id}"]`).remove();
};
