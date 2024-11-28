
`javascript
const flashcards = [
    { portuguese: "Bom dia!", english: "Good morning!" },
{ portuguese: "Como está?", english: "How are you?" },
    { portuguese: "Obrigado/a.", english: "Thank you." },
    { portuguese: "Quanto custa?", english: "How much does it cost?" },
    { portuguese: "Onde está o banheiro?", english: "Where is the bathroom?" }
];

let currentCard = 0;
let score = 0;
let quizInProgress = false;
let quizIndex = 0;

const frontText = document.getElementById('front-text');
const backText = document.getElementById('back-text');
const quizSection = document.getElementById('quiz-section');
const quizQuestion = document.getElementById('quiz-question');
const choices = document.getElementById('choices');
const quizFeedback = document.getElementById('quiz-feedback');
const scoreSection = document.getElementById('score-section');
const scoreText = document.getElementById('score-text');
const nextButton = document.getElementById('next-question');
const restartButton = document.getElementById('restart');
const quizButton = document.getElementById('quiz');

function updateFlashcard() {
    frontText.textContent = flashcards[currentCard].portuguese;
    backText.textContent = flashcards[currentCard].english;
}

function startQuiz() {
    score = 0;
    quizIndex = 0;
    quizInProgress = true;
    quizSection.classList.remove('hidden');
    nextQuestion();
}

function nextQuestion() {
    if (quizIndex >= flashcards.length) {
        endQuiz();
        return;
    }

    const currentQuestion = flashcards[quizIndex];
    quizQuestion.textContent = What does "${currentQuestion.portuguese}" mean?;

    const correctAnswer = currentQuestion.english;
    const wrongAnswers = flashcards.filter(fc => fc.english !== correctAnswer).map(fc => fc.english);
    const answers = [correctAnswer, ...getRandomElements(wrongAnswers, 3)];
    shuffle(answers);

    choices.innerHTML = answers.map(answer => 
        <button onclick="checkAnswer('${answer}')">${answer}</button>
    ).join('');
}

function checkAnswer(answer) {
    const correctAnswer = flashcards[quizIndex].english;
    if (answer === correctAnswer) {
        score++;
        quizFeedback.textContent = "Correct!";
        quizFeedback.style.color = "green";
    } else {
        quizFeedback.textContent = Incorrect! The correct answer is "${correctAnswer}".;
        quizFeedback.style.color = "red";
    }

    nextButton.classList.remove('hidden');
}

function nextQuizQuestion() {
    quizIndex++;
    nextButton.classList.add('hidden');
    quizFeedback.textContent = '';
    nextQuestion();
}

function endQuiz() {
    quizInProgress = false;
    quizSection.classList.add('hidden');
    scoreSection.classList.remove('hidden');
    scoreText.textContent = Your score is ${score} out of ${flashcards.length}.;
}

function restartQuiz() {
    scoreSection.classList.add('hidden');
    startQuiz();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomElements(arr, num) {
    const shuffled = arr.slice(0);
    shuffle(shuffled);
    return shuffled.slice(0, num);
}

document.getElementById('prev').addEventListener('click', () => {
    currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
    updateFlashcard();
});

document.getElementById('next').addEventListener('click', () => {
    currentCard = (currentCard + 1) % flashcards.length;
    updateFlashcard();
});

quizButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuizQuestion);
restartButton.addEventListener('click', restartQuiz);

updateFlashcard();
`