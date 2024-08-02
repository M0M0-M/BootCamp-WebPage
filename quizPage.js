const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const resultMessageContainer = document.getElementById('result-message');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start-quiz');
const backToWelcomeButton = document.getElementById('back-to-welcome');
const welcomeContainer = document.getElementById('welcome');
const quizContentContainer = document.getElementById('quiz-container');

const questions = [
    {
        question: "What is the capital of Zambia?",
        answers: {
            a: "Livingstone",
            b: "Luapula",
            c: "Lusaka"
        },
        correctAnswer: "c"
    },
    {
        question: "What is 2 + 3?",
        answers: {
            a: "4",
            b: "5",
            c: "6"
        },
        correctAnswer: "b"
    },
    {
        question: "Whos the first president of Zambia?",
        answers: {
            a: "Kenneth Kaunda",
            b: "Fredrick Chiluba",
            c: "Levy Mwanawasa"
        },
        correctAnswer: "a"
    }
];

function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="section">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
        }
    });

    let resultMessage = "";

    if (numCorrect === 3) {
        resultMessage = "Great!";
    } else if (numCorrect === 2) {
        resultMessage = "Good!";
    } else if (numCorrect === 1) {
        resultMessage = "Nice try!";
    } else {
        resultMessage = "Sorry!";
    }

    resultMessageContainer.innerText = `You scored ${numCorrect} out of ${questions.length}. ${resultMessage}`;

    quizContentContainer.style.display = 'none';
    resultsContainer.style.display = 'flex';
}

startButton.addEventListener('click', () => {
    welcomeContainer.style.display = 'none';
    quizContentContainer.style.display = 'block';
    buildQuiz();
});

submitButton.addEventListener('click', showResults);

backToWelcomeButton.addEventListener('click', () => {
    resultsContainer.style.display = 'none';
    welcomeContainer.style.display = 'block';
    quizContentContainer.style.display = 'none';
});
