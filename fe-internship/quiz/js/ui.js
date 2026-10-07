import { shuffle } from "./quiz.js";

export function showQuestion(
  question,
  questionNumber,
  totalQuestions,
  onAnswer
) {
  const questionNumberElement =
    document.querySelector("#question-number");

  const questionElement =
    document.querySelector("#question");

  const optionsElement =
    document.querySelector("#options");

  questionNumberElement.textContent =
    `Question ${questionNumber} / ${totalQuestions}`;

  questionElement.textContent =
    question.question;

  optionsElement.innerHTML = "";

  const shuffledOptions = shuffle(question.options);

  shuffledOptions.forEach(option => {

    const label = document.createElement("label");

    label.classList.add("option");

    const checkbox = document.createElement("input");

    checkbox.type = "radio";
    checkbox.name = "quiz-answer";
    checkbox.value = option;

    const text = document.createElement("span");

    text.textContent = option;

    label.append(checkbox, text);

    checkbox.addEventListener("change", () => {

      // Disable all other options
      const allCheckboxes =
        document.querySelectorAll(
          'input[name="quiz-answer"]'
        );

      allCheckboxes.forEach(input => {
        input.disabled = true;
      });

      label.classList.add("selected");

      onAnswer(option);
    });

    optionsElement.append(label);
  });
}