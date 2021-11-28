var questions = [
    {
        question: "what is 1",
        options: ["1", "2", "3"],
        answer: "1"
    },
    {
        question: "what is 2",
        options: ["3", "2", "1"],
        answer: "2"
    },
    {
        question: "what is 3",
        options: ["3", "2", "1"],
        answer: "3"
    }
];

var startButton = document.getElementById("start");
var timerElement = document.getElementById("timer");
var timeLeft = 10; 
var userScore = 0;
var displayScore = document.getElementById("displayScore");

displayScore.innerText = userScore;

var startQuiz = function(){
    var startPage = document.getElementById("start-page");
    startPage.remove();
    populateQuestion();
    countDown();
};

function countDown(){
    var timer = setInterval(function() {
        timerElement.innerText = timeLeft--;
        if(timeLeft == 1) {
            clearInterval(timer) 
            stopQuiz();
        }
    }, 1000);
}

function populateQuestion(){
    let randomNum = Math.floor(Math.random() * 2);
    let q = document.createElement("span");
    let queue = document.getElementById("quizQuestions");
    let button = document.createElement("button");

    button.addEventListener("click", validateQuestion);

    queue.innerHTML = "";

    button.innerText = "Check Answer";
    button.setAttribute("value", questions[randomNum].answer);
    button.setAttribute("class", "checkAnswer");

    q.innerText = questions[randomNum].question;
    queue.append(q, button);

    let inputQueue = document.getElementById("quizQuestions");
    let optionArray = questions[randomNum].options;

    optionArray.forEach((val, index) => {
        let input = document.createElement("input");
        let label = document.createElement("label");

        label.innerText = val;
        label.setAttribute("for", val);
        input.setAttribute("type", "radio");
        input.setAttribute("value", val);
        input.setAttribute("name", "answerOptions");

        inputQueue.append(input, label);
    });

   // questions.splice(questions[randomNum], 1);
}


function validateQuestion(event){
    let answer = event.target.value;
    let optionList = document.getElementById("quizQuestions").getElementsByTagName("input");

    for(i = 0; i < optionList.length; i++){
        if(optionList[i].checked && optionList[i].value == answer){
            console.log("WOOOO");
            timeLeft = timeLeft + 20;
            userScore = userScore + 5;
            displayScore.innerText = userScore;
            populateQuestion();
        } else if (optionList[i].checked && optionList[i].value != answer && userScore > 0){
            userScore = userScore -1;
            displayScore.innerText = userScore;
            console.log("ya dumb and lost a point");
        }
        else if(optionList[i].checked && optionList[i].value != answer && userScore == 0){
            stopQuiz();
        }
    }
}

function stopQuiz(){
    let username = prompt("The quiz is over! Please enter your name");

    localStorage.setItem(username, userScore);
}


startButton.addEventListener("click", startQuiz);
