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
let startBtn = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

let quizDuration = 120;
let quizQuestions = [quizQuestion1,quizQuestion2,quizQuestion3,quizQuestion4,quizQuestion5];
let quizIndex = 0;

// 2. When th  e start quiz button is pressed the first question pops-up
function loadQuestion(){
    let currQuestion = quizQuestions[quizIndex];
    let answerStatus = document.createElement("div");
    headerEl.textContent = currQuestion.question;
    contentArea.textContent = "";
    for(let i = 0; i < currQuestion.numAnswers; i++){
        let answeBtn = document.createElement("button");
        answeBtn.textContent = currQuestion[`answer${i}`];
        answeBtn.setAttribute("id",i);
        // 3. The question should have a list of 4 answers that the user can click on
        answeBtn.addEventListener("click",function(event){
            event.preventDefault();
            let target = event.target;
            if(target.matches("button")){
                let elId = target.getAttribute("id");
                if(elId === currQuestion.correctAnswer){
                    answerStatus.textContent = `Correct`;
                } else {
                    answerStatus.textContent = `Incorrect`;
                }
                if(quizIndex + 1 < quizQuestions.length){
                    quizIndex++;
                    loadQuestion();
                }
            }
        })
        contentArea.append(answeBtn);
    }
    contentArea.append(answerStatus);
}

// 1. When the start quiz button is pressed the timer begins
startBtn.addEventListener("click",function(event){
    event.preventDefault();
    loadQuestion();

    let quizTimer = setInterval(function(){
        quizDuration--;

        timerEl.textContent = `Timer: ${quizDuration} seconds`;
        if(quizDuration <= 0){
            timerEl.textContent = "";
            clearInterval(quizTimer);
        }

    },1000);

});
// 4. when the user selects an answer text, should display at the bottom letting them know if they got it right or wrong
    // A button is clicked
    // Check if the selected answer is correct
    // If it is then 
// 5. The quiz ends either when the user answers all the questions or the timer runs out
// 6. When the user completes the quiz there score is added to the scoreboard.
