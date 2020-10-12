// create variables
let timer = 90;
let runningTimer;
let score = 0;
let username = "";
let qNumber;
let finalScore;
var MAX_HIGH_SCORES = 7;

var startButton = document.getElementById("startButton");
var qContainer = document.getElementById("questionsContainer");
var qElement = document.getElementById("question");
var answerButtons = document.getElementById("answers");
var countdown = document.getElementById("timerArea");
var scoreArea = document.getElementById("scoreArea");
var highScoresButton = document.getElementById("showScoresButton");

//create storage for LEADERBOARD
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

//create function to start game on click
function startGame() {
    startButton.classList.add("hide");
    scoreArea.classList.add("hide");
    answerButtons.classList.remove("hide");
    qNumber = 0;
    qContainer.classList.remove("hide");
    scoreArea.innerHTML = "";
    startClock();
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    showQuestion(questions[qNumber]);
}

//create function to display questions
function showQuestion(question) {
    qElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

//create function to start timer
function startClock() {
    countdown.innerHTML = "Time Remaining: " + timer;
    if (timer <= 0) {
        gameOver();
    } else {
        timer -= 1;
        runningTimer = setTimeout(startClock, 1000);
    }
}

// creat function to collect answers
function selectAnswer(e) {
    var selectedButton = e.target;
    if (!selectedButton.dataset.correct) {
        timer = timer - 10;
        console.log(timer);
    }
    if (qNumber == questions.length - 1) {
        gameOver();
    } else {
        clearQuestion();
        qNumber++;
        showQuestion(questions[qNumber]);
        console.log(score);
    }
}

//create function to clear the current question
function clearQuestion() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//create function to end game
function gameOver() {
    clearInterval(runningTimer);
    countdown.innerHTML = "Finished";
    clearQuestion();
    showResults();
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    timer = 90;
    score = 0;
}

function showResults() {
    finalScore = timer;
    if (finalScore < 0) {
        finalScore = 0;
    }
    qElement.innerText = "";
    scoreArea.classList.remove("hide");
    answerButtons.classList.add("hide");
    scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
    username = document.getElementById("initials");
    saveButton = document.getElementById("save-btn");
    username.addEventListener("keyup", function () {
        saveButton.disabled = !username.value;
    });
}

//create function to submit high scores after quiz completion
function submitScores(e) {
    var score = {
        score: finalScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayScores();
}

//creat function to display high scores
function displayScores() {
    clearInterval(runningTimer);
    countdown.innerHTML = "";
    clearQuestion();
    qElement.innerText = "";
    scoreArea.classList.remove("hide");

    scoreArea.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = highScores
        .map(score => {
            return `<li class="scoresList">${score.name} - ${score.score}</li>`;
        })
        .join("");
    startButton.classList.remove("hide");
    highScoresButton.classList.add("hide");
}

//create function to clear high scores
function clearScores() {
    highScores = [];
    highScoresList.innerHTML = "<h3>Scores have been Cleared</h3>";
    document.getElementById("clearScores").classList.add("hide");
}

//questions
var questions = [
    {
        question: "The term 'Pop Quiznos' is from which movie?",
        answers: [
            { text: "21 Jump Street", correct: true },
            { text: "22 Jump Street", correct: false },
            { text: "The LEGO! Movie", correct: false },
            { text: "Billy Madison", correct: false }
        ]
    },
    {
        question: "Which movie currently holds the record for highest-grossing film of all time?",
        answers: [
            { text: "Titanic", correct: false },
            { text: "The Lion King (1994)", correct: false },
            { text: "Avengers: Endgame", correct: true },
            { text: "Avatar", correct: false }
        ]
    },
    {
        question: "Which film previously held the record for highest-grossing flim of all time?",
        answers: [
            { text: "Titanic", correct: false },
            { text: "The Lion King (1994)", correct: false },
            { text: "Avengers: Endgame", correct: false },
            { text: "Avatar", correct: true }
        ]
    },
    {
        question: "How many Harry Potter movies are there?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "8", correct: true }
        ]
    },
    {
        question: "Which is the only Harry Potter book to be adapted into 2 movies instead of 1?",
        answers: [
            { text: "Deathly Hallows", correct: true },
            { text: "Chamber of Secrets", correct: false },
            { text: "Prisoner of Azkaban", correct: false },
            { text: "Order of the Phoenix", correct: false }
        ]
    },
    {
        question: "Which actor founded Happy Madison Productions?",
        answers: [
            { text: "Billy Madison", correct: false },
            { text: "Happy Gilmore", correct: false },
            { text: "Happy Madion", correct: false },
            { text: "Adam Sandler", correct: true }
        ]
    },
    {
        question: "Which is NOT a movie in The Lord of the Rings trilogy?",
        answers: [
            { text: "The Two Towers", correct: false },
            { text: "The Return of the Jedi", correct: true },
            { text: "The Return of the King", correct: false },
            { text: "The Fellowship of the Ring", correct: false }
        ]
    },
    {
        question: "Which trilogy takes place BEFORE The Lord of the Rings even though it was produced AFTER?",
        answers: [
            { text: "Star Wars", correct: false },
            { text: "Planet of the Apes", correct: false },
            { text: "The Hobbit", correct: true },
            { text: "Lord of the Flies", correct: false }
        ]
    }]