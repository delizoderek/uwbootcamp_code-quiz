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
let mainEl = document.querySelector('main');
let timerEl = document.querySelector("#timer");

let quizDuration = 20;
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
    mainEl.style.setProperty("--qAlignment","center");
    mainEl.style.setProperty("--content-width","50vw");
    headerEl.textContent = "Coding Quiz Challenge";
    contentArea.textContent = "";
    statusBox.textContent = "";
    summPara.textContent = "Try to answer the questions within the time limit.";
    startQuizBtn.textContent = "Start Quiz";
    startQuizBtn.setAttribute("id","quiz-button");
    startQuizBtn.addEventListener("click",startQuiz);
    contentArea.append(summPara);
    contentArea.append(startQuizBtn);
}

function renderInitialsScreen(){
    let containerDiv = document.createElement("div");
    let initialsInput = document.createElement("input");
    let submitBtn = document.createElement("button");
    let scoreTxt = document.createElement("p");
    mainEl.style.setProperty("--content-width","30vw");
    contentArea.textContent = "";
    headerEl.textContent = "Enter initials your initials"
    scoreTxt.textContent = `Your final score was ${quizScore}`;
    initialsInput.setAttribute("type","text");
    initialsInput.setAttribute("id","initials-input");
    initialsInput.setAttribute("placeholder","Enter your initials");
    contentArea.append(scoreTxt);
    containerDiv.append(initialsInput);
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("id","submit-button");
    //
    submitBtn.addEventListener("click",function(event){
        event.preventDefault();
        if(initialsInput.value !== ""){
            quizHighscores.push(`${quizScore} - ${initialsInput.value}`);
            quizHighscores.sort(sortScores);
            localStorage.setItem("scoreboard",JSON.stringify(quizHighscores));
            renderHighscores();
        } else {
            alert('Please enter your initials');
        }
    });
    containerDiv.append(submitBtn);
    contentArea.append(containerDiv);
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
    backBtn.addEventListener("click",resetQuiz);
    clearBtn.addEventListener("click",clearScores);
    statusBox.append(backBtn);
    statusBox.append(clearBtn);
}

function answerSelected(event){
    event.preventDefault();
    let target = event.target;
    if(target.matches("button")){
        let elId = target.getAttribute("id");
        let statusDuration = 1;
        if(elId === quizQuestions[quizIndex].correctAnswer){
            statusBox.textContent = `Correct`;
            quizScore += 5;
        } else {
            statusBox.textContent = `Incorrect`;
        }
        statusBox.style.setProperty("--status-border-width","2px");
        let statusClear = setInterval(function(){
            statusDuration--;
            if(statusDuration <= 0){
                statusBox.textContent = "";
                statusBox.style.setProperty("--status-border-width","0px");
                clearInterval(statusClear);
            }
        },500);

        if(quizIndex + 1 < quizQuestions.length){
            quizIndex++;
            loadQuestion();
        } else {
            quizComplete = true;
         }
    }
}

// 2. When the start quiz button is pressed the first question pops-up
function loadQuestion(){
    let currQuestion = quizQuestions[quizIndex];
    mainEl.style.setProperty("--qAlignment","flex-start");
    headerEl.textContent = currQuestion.question;
    contentArea.textContent = "";
    // statusBox.textContent = "";
    for(let i = 0; i < currQuestion.numAnswers; i++){
        let answeBtn = document.createElement("button");
        answeBtn.textContent = `${i}. ${currQuestion[`answer${i}`]}`;
        answeBtn.setAttribute("id",i);
        // 3. The question should have a list of 4 answers that the user can click on
        answeBtn.addEventListener("click",answerSelected);
        contentArea.append(answeBtn);
    }
}

function resetQuiz(){
    quizDuration = 120;
    quizIndex = 0;
    quizScore = 0;
    quizComplete = false;
    renderLandingPage();
}

function clearScores(){
    quizHighscores = [];
    localStorage.removeItem("scoreboard");
    renderHighscores();
}

function quizMonitor(){
    quizDuration--;
    timerEl.textContent = `Time: ${quizDuration}`
    if(quizDuration <= 0 || quizComplete){
        // load initials input
        //load highscore
        contentArea.textContent = "Thanks for Playing";
        timerEl.textContent = "";
        renderInitialsScreen();
        clearInterval(quizTimer);
    }
}

function sortScores(item1,item2){
    let num1 = 0;
    let num2 = 0;
    item1 = item1.split("-")[0].trim();
    item2 = item2.split("-")[0].trim();
    num1 = Number(item1);
    num2 = Number(item2);
    if(num1 > num2){
        return -1;
    }
    
    if(num1 < num2){
        return 1;
    }
    
    return 0;
}



// 1. When the start quiz button is pressed the timer begins
function startQuiz(event){
    event.preventDefault();
    loadQuestion();
    quizTimer = setInterval(quizMonitor,1000);
}
init();