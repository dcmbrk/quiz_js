const questions = [
  {
    question: "Which is largest animal in the world?",
    answer: "Blue whale",
    A: "Shark",
    B: "Blue whale",
    C: "Elephant",
    D: "Giraffe",
  },
  {
    question: "Which is the smallest country in the world?",
    answer: "Vatican City",
    A: "Vatican City",
    B: "Bhutan",
    C: "Nepal",
    D: "Shri Lanka",
  },
  {
    question: "Which is the smallest continent in the world",
    answer: "Australia",
    A: "Asia",
    B: "Australia",
    C: "Arctic",
    D: "Africa",
  },
];

const question = document.getElementById("question");
const answers = document.getElementsByClassName("answer");
const next = document.getElementById("next");
const answeredQuestion = [];
const popUp = document.querySelector(".pop-up");
let randomQuestion;
let right_answer = 0;

function getRandomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

function loadQuestion() {
  randomQuestion = getRandomQuestion();
  while (answeredQuestion.includes(randomQuestion)) {
    randomQuestion = getRandomQuestion();
    console.log(randomQuestion);
  }
  answeredQuestion.push(randomQuestion);

  displayQuestionContent();
  resetQuestionUI();
}

function resetQuestionUI() {
  for (let ans of answers) {
    ans.classList.remove("right-answer");
    ans.classList.remove("wrong-answer");
    ans.classList.remove("diable");
  }
}

function displayQuestionContent() {
  question.textContent =
    answeredQuestion.length + "." + randomQuestion.question;
  answers[0].textContent = randomQuestion.A;
  answers[1].textContent = randomQuestion.B;
  answers[2].textContent = randomQuestion.C;
  answers[3].textContent = randomQuestion.D;

  if (answeredQuestion.length === questions.length) {
    next.value = "Done";
  } else {
    next.value = "Next";
  }
}

function showAnswer(ans) {
  if (ans.textContent.trim() === randomQuestion.answer.trim()) {
    ans.classList.add("right-answer");
    right_answer++;
  } else {
    ans.classList.add("wrong-answer");
  }

  for (let ans of answers) {
    if (
      ans.textContent.trim() === randomQuestion.answer.trim() &&
      !ans.classList.contains("right-answer")
    ) {
      ans.classList.add("right-answer");
    }
    ans.classList.add("diable");
  }
}

function resetGame() {
  answeredQuestion.length = 0;
  right_answer = 0;
  loadQuestion();
}

function showScore() {
  popUp.classList.remove("hide");
  popUp.textContent = `Score:${right_answer}/${questions.length}`;
}

//Next button event
next.addEventListener("click", () => {
  if (answeredQuestion.length < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

//Question event
for (let ans of answers) {
  ans.addEventListener("click", () => {
    showAnswer(ans);
  });
}

loadQuestion();

popUp.addEventListener("click", () => {
  popUp.classList.add("hide");
  resetGame();
});
