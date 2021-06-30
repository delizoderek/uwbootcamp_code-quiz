// Object that holds data for question 1
let quizQuestion1 = {
    question: "Which of the folowing is FALSE about references in C++?",
    numAnswers: 4,
    correctAnswer: "3",
    answer0: "References cannot be NULL",
    answer1: "A reference must be initialized when declared",
    answer2: "Once a reference is created, it cannot be later made to reference another object; it cannot be reset.",
    answer3: "References cannot refer to a constant value",
}

// Object that holds data for question 2
let quizQuestion2 = {
    question: "Which function overloads the >> operator in python?",
    numAnswers: 4,
    correctAnswer: "2",
    answer0: "more()",
    answer1: "gt()",
    answer2: "rshift()",
    answer3: "None of the above",
}

// Object that holds data for question 3
let quizQuestion3 = {
    question: "Which of these is a super class of all errors and exceptions in the Java language?",
    numAnswers: 4,
    correctAnswer: "1",
    answer0: "RunTimeExceptions",
    answer1: "Throwable",
    answer2: "FileNotFoundException",
    answer3: "Catchable",
}

// Object that holds data for question 4
let quizQuestion4 = {
    question: "Memory can be accessed in ARM systems by ______ instructions.",
    numAnswers: 4,
    correctAnswer: "1",
    answer0: "Store, MOVE, Load",
    answer1: "Store, Move",
    answer2: "Store, arithmetic, logical",
    answer3: "Load, arithmetic, logical",
}

// Object that holds data for question 5
let quizQuestion5 = {
    question: "Which of the folowing is not a Javascript data type?",
    numAnswers: 4,
    correctAnswer: "2",
    answer0: "Undefined",
    answer1: "Boolean",
    answer2: "Float",
    answer3: "Number",
}

// Variables for referencing the webpage nodes
let headerEl = document.querySelector("#info-header");
let contentArea = document.querySelector("#content-area");
let statusBox = document.querySelector("#status-box");
let mainEl = document.querySelector('main');
let timerEl = document.querySelector("#timer");

// Variables used for running the quiz
let quizDuration = 120;
let quizIndex = 0;
let quizScore = 0;
let quizComplete = false;
let quizQuestions = [quizQuestion1,quizQuestion2,quizQuestion3,quizQuestion4,quizQuestion5];
let quizHighscores = [];
let quizTimer;

// Handles loading highscores from the local storage and loading the start quiz page
function init(){
    let loadScores = JSON.parse(localStorage.getItem("scoreboard"));
    if(loadScores !== null){
        quizHighscores = loadScores;
    }
    renderLandingPage();
}

// Loads elements and text required for starting the quiz
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

// Renders the current quiz question using the values from the question object
function renderQuestion(){
    let currQuestion = quizQuestions[quizIndex];
    mainEl.style.setProperty("--qAlignment","flex-start");
    headerEl.textContent = currQuestion.question;
    contentArea.textContent = "";

    // Builds the multiple choice answers the user can select
    for(let i = 0; i < currQuestion.numAnswers; i++){
        let answeBtn = document.createElement("button");
        answeBtn.textContent = `${i}. ${currQuestion[`answer${i}`]}`;
        answeBtn.setAttribute("id",i);
        answeBtn.addEventListener("click",answerSelected);
        contentArea.append(answeBtn);
    }
}

// Renders the elements need for the initials input page
function renderInitialsScreen(){
    // Initialize variables
    let containerDiv = document.createElement("div");
    let initialsInput = document.createElement("input");
    let submitBtn = document.createElement("button");
    let scoreTxt = document.createElement("p");
    // Populate content
    mainEl.style.setProperty("--content-width","30vw");
    contentArea.textContent = "";
    headerEl.textContent = "Enter your initials here";
    scoreTxt.textContent = `Your final score was ${quizScore}`;
    initialsInput.setAttribute("type","text");
    initialsInput.setAttribute("id","initials-input");
    initialsInput.setAttribute("placeholder","Enter your initials");
    submitBtn.textContent = "Submit";
    submitBtn.setAttribute("id","submit-button");
    // Append elements
    contentArea.append(scoreTxt);
    containerDiv.append(initialsInput);

    // Adds an event listener to the submit button
    submitBtn.addEventListener("click",function(event){
        event.preventDefault();
        //If the initials value is not empty then update the array, sort it, then save the array locally
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

// Renders the highscores page
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

// Event Listener function connected to the Start Quiz button
// Starts the quiz timer, then loads the first question.
function startQuiz(event){
    event.preventDefault();
    renderQuestion();
    quizTimer = setInterval(quizMonitor,1000);
}

// Event Listener function that is linked to the multiple choice answers
// When clicked will check if the answer is correct/incorrect, then update the score and status box.
// Finally, loads the next question
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
            renderQuestion();
        } else {
            quizComplete = true;
         }
    }
}

// Event listener connected to the Go Back button on the highscores page
// When clicked resets the quiz variables back to default values and loads the start page
function resetQuiz(){
    quizDuration = 120;
    quizIndex = 0;
    quizScore = 0;
    quizComplete = false;
    renderLandingPage();
}

// Event Listener function connected to the Clear Highscores Button
// Clears the highscores array and the local storage item
function clearScores(){
    quizHighscores = [];
    localStorage.removeItem("scoreboard");
    renderHighscores();
}

// A time interval function that is linked to the quiz timer variable
// The timer will tick down until either time runs out or the quiz is finished
function quizMonitor(){
    quizDuration--;
    timerEl.textContent = `Time: ${quizDuration}`
    if(quizDuration <= 0 || quizComplete){
        contentArea.textContent = "Thanks for Playing";
        timerEl.textContent = "";
        renderInitialsScreen();
        clearInterval(quizTimer);
    }
}

// Custom sort function for sorting the highscores by score
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

// Initialize webpage on load
init();