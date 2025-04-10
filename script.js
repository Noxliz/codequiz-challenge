// Questions data with categories
const questions = {
    general: [
        {
            question: "Quelle est la capitale de la France?",
            options: ["Londres", "Berlin", "Paris", "Madrid"],
            answer: 2
        },
        {
            question: "Quel est le plus grand océan du monde?",
            options: ["Atlantique", "Indien", "Pacifique", "Arctique"],
            answer: 2
        }
    ],
    tech: [
        {
            question: "Quel langage s'exécute dans un navigateur web?",
            options: ["Java", "C", "Python", "JavaScript"],
            answer: 3
        },
        {
            question: "Que signifie HTML?",
            options: [
                "Hypertext Markup Language",
                "Hypertext Machine Language",
                "Hypertext Marking Language",
                "Hypertext Mark Language"
            ],
            answer: 0
        }
    ]
};

let currentQuestions = [];

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const resultContainer = document.getElementById('result-container');
const finalScoreElement = document.getElementById('final-score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;
let selectedOption = null;

// Category selection
function showCategorySelection() {
    resetState();
    questionElement.textContent = "Choisissez une catégorie";
    
    const categories = Object.keys(questions);
    categories.forEach(category => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = category;
        optionElement.addEventListener('click', () => selectCategory(category));
        optionsElement.appendChild(optionElement);
    });
}

function selectCategory(category) {
    currentQuestions = [...questions[category]];
    // Shuffle questions
    currentQuestions = currentQuestions.sort(() => Math.random() - 0.5);
    startQuiz();
}

// Initialize quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    resultContainer.style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    startTimer();
    showQuestion();
}

// Display question
function showQuestion() {
    resetState();
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });
    
    nextButton.disabled = true;
}

// Reset question state
function resetState() {
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
    feedbackElement.style.display = 'none';
    feedbackElement.className = 'feedback';
    selectedOption = null;
}

// Select option
function selectOption(index) {
    selectedOption = index;
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    nextButton.disabled = false;
}

// Check answer
function checkAnswer() {
    if (selectedOption === null) return;
    
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    if (selectedOption === currentQuestion.answer) {
        options[selectedOption].classList.add('correct');
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        options[selectedOption].classList.add('incorrect');
        options[currentQuestion.answer].classList.add('correct');
        feedbackElement.textContent = 'Incorrect!';
        feedbackElement.classList.add('incorrect');
    }
    
    feedbackElement.style.display = 'block';
    nextButton.disabled = true;
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// End quiz
function endQuiz() {
    clearInterval(timer);
    document.querySelector('.quiz-container').style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = currentQuestions.length;
}

// Timer
function startTimer() {
    clearInterval(timer);
    timeElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Display high scores
function displayHighScores() {
    // This will be implemented later
    console.log("High scores display will be implemented here");
}

// Event listeners
nextButton.addEventListener('click', () => {
    checkAnswer();
    setTimeout(nextQuestion, 1500);
});

restartButton.addEventListener('click', startQuiz);

// Start the quiz when page loads
window.addEventListener('DOMContentLoaded', () => {
    showCategorySelection();
    displayHighScores();
});
