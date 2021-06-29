let quizQuestion1 = {
    question: "Which of the folowing is FALSE about references in C++?",
    numAnswers: 4,
    correctAnswer: "3",
    answer0: "References cannot be NULL",
    answer1: "A reference must be initialized when declared",
    answer2: "Once a reference is created, it cannot be later made to reference another object; it cannot be reset.",
    answer3: "References cannot refer to a constant value",
}
let quizQuestion2 = {
    question: "Which function overloads the >> operator in python?",
    numAnswers: 4,
    correctAnswer: "2",
    answer0: "more()",
    answer1: "gt()",
    answer2: "rshift()",
    answer3: "None of the above",
}
let quizQuestion3 = {
    question: "Which of these is a super class of all errors and exceptions in the Java language?",
    numAnswers: 4,
    correctAnswer: "1",
    answer0: "RunTimeExceptions",
    answer1: "Throwable",
    answer2: "FileNotFoundException",
    answer3: "Catchable",
}
let quizQuestion4 = {
    question: "Memory can be accessed in ARM systems by ______ instructions.",
    numAnswers: 4,
    correctAnswer: "1",
    answer0: "Store, MOVE, Load",
    answer1: "Store, Move",
    answer2: "Store, arithmetic, logical",
    answer3: "Load, arithmetic, logical",
}
let quizQuestion5 = {
    question: "Which of the folowing is not a Javascript data type?",
    numAnswers: 4,
    correctAnswer: "2",
    answer0: "Undefined",
    answer1: "Boolean",
    answer2: "Float",
    answer3: "Number",
}

let headerEl = document.querySelector("#info-header");
let contentArea = document.querySelector("#content-area");
let statusBox = document.querySelector("#status-box");
let timerEl = document.querySelector("#timer");

let quizDuration = 120;
let quizIndex = 0;
let quizScore = 0;
let quizComplete = false;
let quizQuestions = [quizQuestion1,quizQuestion2,quizQuestion3,quizQuestion4,quizQuestion5];
let quizHighscores = [];
let quizTimer;

// Handles loading highscores from the local storage
function init(){
    let loadScores = JSON.parse(localStorage.getItem("scoreboard"));
    if(loadScores !== null){
        quizHighscores = loadScores;
    }
    renderLandingPage();
}

function renderLandingPage(){
    let summPara = document.createElement("p");
    let startQuizBtn = document.createElement("button");
    contentArea.textContent = "";
    summPara.textContent = "Try to answer the questions within the time limit.";
    startQuizBtn.textContent = "Start Quiz";
    startQuizBtn.addEventListener("click",startQuiz);
    contentArea.append(summPara);
    contentArea.append(startQuizBtn);
}

function renderInitialsScreen(){
    contentArea.textContent = "";
    headerEl.textContent = "Enter initials your initials"
    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("type","text");
    initialsInput.setAttribute("id","initials-input");
    initialsInput.setAttribute("placeholder","Enter your initials");
    contentArea.append(initialsInput);
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener("click",function(event){
        event.preventDefault();
        if(initialsInput.value !== ""){
            quizHighscores.push(`${quizScore} - ${initialsInput.value}`);
            localStorage.setItem("scoreboard",JSON.stringify(quizHighscores));
            renderHighscores();
        } else {
            alert('Please enter your initials');
        }
    });
    contentArea.append(submitBtn);
}

function renderHighscores(){
    let backBtn = document.createElement("button");
    let clearBtn = document.createElement("button");
    contentArea.textContent = "";
    statusBox.textContent = "";
    headerEl.textContent = "Highscores";
    let scoreboard = document.createElement("ol");
    for(let score of quizHighscores){
        let listEl = document.createElement('li');
        listEl.textContent = score;
        scoreboard.append(listEl);
    }
    contentArea.append(scoreboard);

    backBtn.textContent = 'Go Back';
    clearBtn.textContent = 'Clear Highscores';
    statusBox.append(backBtn);
    statusBox.append(clearBtn);
}

function answerSelected(event){
    event.preventDefault();
    let target = event.target;
    if(target.matches("button")){
        let elId = target.getAttribute("id");
        if(elId === quizQuestions[quizIndex].correctAnswer){
            statusBox.textContent = `Correct`;
            quizScore += 1;
        } else {
            statusBox.textContent = `Incorrect`;
        }
        if(quizIndex + 1 < quizQuestions.length){
            quizIndex++;
            loadQuestion();
        } else {
            quizComplete = true;
        }
    }
}

// 2. When th  e start quiz button is pressed the first question pops-up
function loadQuestion(){
    let currQuestion = quizQuestions[quizIndex];
    headerEl.textContent = currQuestion.question;
    contentArea.textContent = "";
    for(let i = 0; i < currQuestion.numAnswers; i++){
        let answeBtn = document.createElement("button");
        answeBtn.textContent = currQuestion[`answer${i}`];
        answeBtn.setAttribute("id",i);
        // 3. The question should have a list of 4 answers that the user can click on
        answeBtn.addEventListener("click",answerSelected);
        contentArea.append(answeBtn);
    }
}

function quizMonitor(){
    quizDuration--;
    timerEl.textContent = `Timer: ${quizDuration} seconds`
    if(quizDuration <= 0 || quizComplete){
        // load initials input
        //load highscore
        contentArea.textContent = "Thanks for Playing";
        timerEl.textContent = "";
        renderInitialsScreen();
        clearInterval(quizTimer);
    }
}

// 1. When the start quiz button is pressed the timer begins
function startQuiz(event){
    event.preventDefault();
    loadQuestion();
    quizTimer = setInterval(quizMonitor,1000);
}

// 4. when the user selects an answer text, should display at the bottom letting them know if they got it right or wrong
    // A button is clicked
    // Check if the selected answer is correct
    // If it is then 
// 5. The quiz ends either when the user answers all the questions or the timer runs out
// 6. When the quiz completes the user is asked to enter there initials
init();