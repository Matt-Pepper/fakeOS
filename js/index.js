
const maximizeUI = (e) => {
    //e.target.classList.toggle('maximized');
    e.target.closest(".window-ui").classList.toggle('maximized');
}

const button = document.querySelectorAll('.titlebar__maximizeButton');
console.log(button);

for (let index = 0; index < button.length; index++) {
    button[index].addEventListener("click", maximizeUI, false);
}

//const windowUi = document.querySelectorAll('.window-ui');



