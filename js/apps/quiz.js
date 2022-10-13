const quizTemplate = document.getElementById("quizTemplate");
const questions = [];
const score = [0, 0];
const buttonFunctions = [];

export const createQuiz = (parent) => {
    if (document.querySelectorAll(".quiz").length < 1)
    {
	const quizClone = quizTemplate.content.firstElementChild.cloneNode(true);
	parent.closest(".window-ui").style.height = "800px";
	parent.closest(".window-ui").style.width = "600px";
	fetchQuestions(quizClone);
	appendQuiz(parent, quizClone);
    } else {
        parent.closest(".window-ui").remove();
    }
};

const appendQuiz = (parent, quiz) => {
	parent.appendChild(quiz);
};

const fetchQuestions = async (clone) => {
	try {
		const response = await fetch(
			"https://opentdb.com/api.php?amount=20&category=9&type=multiple"
		);
		const data = await response.json();
		fillQuiz(data);
	} catch (e) {
		console.log(e);
	} finally {
		nextQuestion(clone);
	}
};

const questionFactory = (obj) => {
	questions.push({
		difficulty: obj.difficulty,
		question: obj.question,
		correct: obj.correct_answer,
		wrong: obj.incorrect_answers,
	});
};

const fillQuiz = (obj) => {
	for (const result of obj.results) {
		questionFactory(result);
	}
};

const nextQuestion = (clone) => {
	const question = questions.shift();
	const answers = [question.correct, ...question.wrong].sort();
	clone.querySelector(".quiz__question").innerHTML = `Question ${score[1] + 1}: <br/> ${
		question.question
	}`;
	clone.querySelector(".quiz__difficulty").innerHTML = `Difficulty: ${question.difficulty}`;
	clone.querySelector(".quiz__answer--one").innerHTML = answers[0];
	clone.querySelector(".quiz__answer--two").innerHTML = answers[1];
	clone.querySelector(".quiz__answer--three").innerHTML = answers[2];
	clone.querySelector(".quiz__answer--four").innerHTML = answers[3];
	clone.querySelector(".quiz__score").innerHTML = `Your score is ${score[0]} out of ${score[1]}`;

	applyFunctionsToBtns(question, clone);
};

const applyFunctionsToBtns = (question, clone) => {
	const buttons = clone.querySelectorAll(".quiz__answer");
	for (let i = 0; i < buttons.length; i++) {
		buttonFunctions.push(() => getAnswer(question, buttons[i], clone));
		buttons[i].addEventListener("click", buttonFunctions[i]);
	}
};

const getAnswer = (question, element, clone) => {
	const correctPara = clone.querySelector(".quiz__correct");
	if (element.innerHTML === question.correct) {
		correctPara.innerHTML = `"${question.correct}" <br/> was the correct answer!`;
		correctPara.classList.add("quiz__correct--correct");
		correctPara.classList.remove("quiz__correct--wrong");
		score[0]++;
		score[1]++;
	} else {
		correctPara.innerHTML = `The correct answer was:<br/> "${question.correct}"`;
		correctPara.classList.add("quiz__correct--wrong");
		correctPara.classList.remove("quiz__correct--correct");
		score[1]++;
	}
	removeFunctions(clone);
	if (questions.length) {
		nextQuestion(clone);
	} else {
		fetchQuestions();
	}
};

const removeFunctions = (clone) => {
	const buttons = clone.querySelectorAll(".quiz__answer");
	while (buttonFunctions.length > 0) {
		for (const button of buttons) {
			button.removeEventListener("click", buttonFunctions.shift());
		}
	}
};
