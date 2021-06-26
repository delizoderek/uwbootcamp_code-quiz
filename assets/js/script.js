let startBtn = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

let quizDuration = 120;

startBtn.addEventListener("click",function(event){
    event.preventDefault();

    let quizTimer = setInterval(function(){
        quizDuration--;

        timerEl.textContent = `Timer: ${quizDuration} seconds`;
        if(quizDuration <= 0){
            timerEl.textContent = "";
            clearInterval(quizTimer);
        }

    },1000);

});
// 1. When the start quiz button is pressed the timer begins
// 2. When the start quiz button is pressed the first question pops-up
// 3. The question should have a list of 4 answers that the user can click on
// 4. when the user selects an answer text, should display at the bottom letting them know if they got it right or wrong
// 5. The quiz ends either when the user answers all the questions or the timer runs out
// 6. When the user completes the quiz there score is added to the scoreboard.
