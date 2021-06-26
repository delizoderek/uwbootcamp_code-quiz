let headerEl = document.querySelector("#info-header");
let contentArea = document.querySelector("#content-area");
let startBtn = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

let quizDuration = 120;

// 2. When th  e start quiz button is pressed the first question pops-up
function setQuestion(){
    let tempAnswers = [".memoryAddress()",".addressAt()", "*myVar","myVar.getAddress()"];
    contentArea.textContent = "";
    headerEl.textContent = "How do you access the memory address of a variable in c++?";
    let listEl = document.createElement("ul");
    for(let ans of tempAnswers){
        let itemEl = document.createElement("li");
        itemEl.textContent = ans;
        listEl.append(itemEl);
    }
    contentArea.append(listEl);



}

// 1. When the start quiz button is pressed the timer begins
startBtn.addEventListener("click",function(event){
    event.preventDefault();

    setQuestion();

    let quizTimer = setInterval(function(){
        quizDuration--;

        timerEl.textContent = `Timer: ${quizDuration} seconds`;
        if(quizDuration <= 0){
            timerEl.textContent = "";
            clearInterval(quizTimer);
        }

    },1000);

});
// 3. The question should have a list of 4 answers that the user can click on
// 4. when the user selects an answer text, should display at the bottom letting them know if they got it right or wrong
// 5. The quiz ends either when the user answers all the questions or the timer runs out
// 6. When the user completes the quiz there score is added to the scoreboard.
