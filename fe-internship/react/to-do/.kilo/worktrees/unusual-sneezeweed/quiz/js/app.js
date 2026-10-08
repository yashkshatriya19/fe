import { questions } from "./questions.js";

import {
  getQuestions,
  calculateScore
} from "./quiz.js";

import {
  showQuestion
} from "./ui.js";


// =========================
// DOM ELEMENTS
// =========================

const form =
  document.querySelector("#setup-form");

const setupScreen =
  document.querySelector("#setup-screen");

const quizScreen =
  document.querySelector("#quiz-screen");

const resultScreen =
  document.querySelector("#result-screen");

const nextButton =
  document.querySelector("#next-btn");

const restartButton =
  document.querySelector("#restart-btn");

const userNameElement =
  document.querySelector("#user-name");

const finalScore =
  document.querySelector("#final-score");

const resultMessage =
  document.querySelector("#result-message");

const review =
  document.querySelector("#review");


// =========================
// QUIZ VARIABLES
// =========================

let selectedQuestions = [];

let currentQuestionIndex = 0;

let userAnswers = [];

let currentUser = null;

let selectedAnswer = null;


// =========================
// START QUIZ
// =========================

form.addEventListener("submit", function (event) {

  event.preventDefault();

  // Get user information

  const name =
    document.querySelector("#name").value.trim();

  const age =
    document.querySelector("#age").value;

  const topic =
    document.querySelector(
      'input[name="topic"]:checked'
    ).value;


  // Create user object

  currentUser = {
    name,
    age,
    topic
  };


  console.log("User:", currentUser);


  // Get questions for selected topic

  selectedQuestions =
    getQuestions(
      questions,
      topic
    );


  if (selectedQuestions.length === 0) {

    alert(
      "No questions available for this topic."
    );

    return;
  }


  // Reset quiz

  currentQuestionIndex = 0;

  userAnswers = [];

  selectedAnswer = null;


  // Show username

  userNameElement.textContent =
    `Hi, ${currentUser.name} 👋`;


  // Change screen

  setupScreen.style.display = "none";

  quizScreen.style.display = "block";

  resultScreen.style.display = "none";


  // Show first question

  showCurrentQuestion();

});


// =========================
// SHOW QUESTION
// =========================

function showCurrentQuestion() {

  selectedAnswer = null;

  nextButton.disabled = true;

  nextButton.textContent =
    currentQuestionIndex ===
    selectedQuestions.length - 1
      ? "Finish →"
      : "Next →";


  showQuestion(

    selectedQuestions[currentQuestionIndex],

    currentQuestionIndex + 1,

    selectedQuestions.length,

    handleAnswer

  );

}


// =========================
// HANDLE ANSWER
// =========================

function handleAnswer(answer) {

  selectedAnswer = answer;

  nextButton.disabled = false;

}


// =========================
// NEXT BUTTON
// =========================

nextButton.addEventListener(
  "click",
  function () {

    // Don't continue without selecting
    // an answer

    if (selectedAnswer === null) {

      return;

    }


    const currentQuestion =
      selectedQuestions[currentQuestionIndex];


    // Check answer

    const isCorrect =
      selectedAnswer === currentQuestion.answer;


    // Save answer

    userAnswers.push({

      question: currentQuestion.question,

      selectedAnswer: selectedAnswer,

      correctAnswer: currentQuestion.answer,

      correct: isCorrect,

      explanation: currentQuestion.explanation

    });


    // Move to next question

    currentQuestionIndex++;


    // More questions?

    if (
      currentQuestionIndex <
      selectedQuestions.length
    ) {

      showCurrentQuestion();

    } else {

      showResult();

    }

  }
);


// =========================
// SHOW RESULT
// =========================

function showResult() {

  quizScreen.style.display = "none";

  resultScreen.style.display = "block";


  const score =
    calculateScore(userAnswers);


  finalScore.textContent =
    `${score} / ${selectedQuestions.length}`;


  resultMessage.textContent =
    `${currentUser.name}, you answered ${score} out of ${selectedQuestions.length} correctly.`;


  review.innerHTML = "";


  userAnswers.forEach(
    (answer, index) => {

      const reviewItem =
        document.createElement("article");


      reviewItem.classList.add(
        "review-item"
      );


      if (answer.correct) {

        reviewItem.classList.add(
          "correct"
        );

      } else {

        reviewItem.classList.add(
          "wrong"
        );

      }


      reviewItem.innerHTML = `

        <h3>
          ${index + 1}. ${answer.question}
        </h3>

        <p>
          <strong>Your answer:</strong>
          ${answer.selectedAnswer}
        </p>

        <p>
          <strong>Correct answer:</strong>
          ${answer.correctAnswer}
        </p>

        <div class="explanation">
          <strong>Explanation:</strong>
          ${answer.explanation}
        </div>

      `;


      review.append(reviewItem);

    }
  );

}


// =========================
// RESTART
// =========================

restartButton.addEventListener(
  "click",
  function () {

    setupScreen.style.display = "block";

    quizScreen.style.display = "none";

    resultScreen.style.display = "none";


    form.reset();


    selectedQuestions = [];

    currentQuestionIndex = 0;

    userAnswers = [];

    selectedAnswer = null;

  }
);