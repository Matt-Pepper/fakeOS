import * as icons from "../builders/icon.js";

const gameTemplate = document.getElementById("rpsTemplate");
const score = {win: 0, lose: 0, draw: 0}
export const createGame = (parent) => {
	const gameClone = gameTemplate.content.firstElementChild.cloneNode(true);
	buttonEvents(gameClone);
	parent.appendChild(gameClone);
};

const buttonEvents = (clone) => {
	const buttons = clone.querySelectorAll(".game__button");
	for (const button of buttons) {
		button.addEventListener("click", getMove);
	}
};

const getMove = (e) => {
	const opponent = getOpponentMove();
	const move = e.target.value;
	const result = { win: "win", lose: "lose", draw: "draw" };
	changeOpponent(opponent, e);
	if (move === opponent) {
		gameResult(result.draw, e);
        score.draw++
        updateScore(e);
		return;
	}
	if (
		(move === "paper" && opponent === "rock") ||
		(move === "rock" && opponent === "scissors") ||
		(move === "scissors" && opponent === "paper")
	) {
		gameResult(result.win, e);
        score.win++
        updateScore(e);
		return;
	}
	gameResult(result.lose, e);
    score.lose++
    updateScore(e);
	return;
};

const gameResult = (result, e) => {
	const opponent = e.target.closest(".game").querySelector(".game__opponent");
	const win = "game__opponent--win";
	const lose = "game__opponent--lose";
	switch (result) {
		case "win":
			opponent.classList.remove(lose);
			opponent.classList.add(win);
            
			break;
		case "lose":
			opponent.classList.remove(win);
			opponent.classList.add(lose);
            
			break;
		case "draw":
			opponent.classList.remove(win);
			opponent.classList.remove(lose);
            
			break;
	}
};

const changeOpponent = (move, e) => {
	const moveHolder = e.target.closest(".game").querySelector(".game__opponent-move");

	moveHolder.classList.remove("fa-hands");
	moveHolder.classList.remove("fa-hand-peace");
	moveHolder.classList.remove("fa-hand");
	moveHolder.classList.remove("fa-hand-back-fist");
	switch (move) {
		case "paper":
			moveHolder.classList.add("fa-hand");
			break;
		case "rock":
			moveHolder.classList.add("fa-hand-back-fist");
			break;
		case "scissors":
			moveHolder.classList.add("fa-hand-peace");
			break;
	}
};

const updateScore = (e) => {
    const total = score.draw + score.lose + score.win;
    const ratio = Math.round((score.win + (score.draw / 10) / total) * 100) / 100;
    const scoreHolder = e.target.closest(".game").querySelector(".game__stats");

    scoreHolder.innerHTML = `Wins: ${score.win} Losses: ${score.lose} Draws: ${score.draw} <br/> Total: ${total} Ratio: ${ratio}`
}

const randomInt = () => {
	return Math.floor(Math.random() * 3);
};
const getOpponentMove = () => {
	const moves = { scissors: 0, paper: 0, rock: 0 };
	for (let i = 0; i < 20000; i++) {
        switch (randomInt()) {
            case 0:
                moves.scissors++;
				break;
                case 1:
                    moves.paper++;
                    break;
                    case 2:
                        moves.rock++;
                        break;
                    }
                }
                console.log(moves)
	return Object.keys(moves).reduce((a, b) => (moves[a] > moves[b] ? a : b));
};
