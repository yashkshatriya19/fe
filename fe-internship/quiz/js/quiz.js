export function shuffle(array) {

  const shuffled = [...array];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    const randomIndex =
      Math.floor(Math.random() * (i + 1));


    [
      shuffled[i],
      shuffled[randomIndex]
    ] = [
      shuffled[randomIndex],
      shuffled[i]
    ];
  }

  return shuffled;
}


export function getQuestions(
  questions,
  topic
) {

  const filteredQuestions =
    questions.filter(
      question =>
        question.topic === topic
    );


  return shuffle(filteredQuestions);
}


export function calculateScore(answers) {

  return answers.reduce(
    (score, answer) =>
      score + (answer.correct ? 1 : 0),

    0
  );

}