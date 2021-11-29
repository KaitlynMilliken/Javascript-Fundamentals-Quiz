var questions = [
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:  ",
        options: ["1. JavaScript", "2. Terminal", "3. For Loops", "4. Console.log()"],
        answer: 1
    },
    {
        question: "The condition in an if/else statement is enclosed with _______.",
        options: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: 1
    },
    {
        question: "Arrays in Javascript can be used to store _____",
        options: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All the Above"],
        answer: 3
    },
    {
        question: "Commonly used data types do NOT include",
        options: ["1. Strings", "2. Boolean", "3. Alerts", "4. Numbers"],
        answer: 2
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        options: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parethesis"],
        answer: 2
    }
];

var startButton = document.getElementById("start");
var timerElement = document.getElementById("timer");
var timeLeft = 2; 
var userScore = 0;
var displayScore = document.getElementById("displayScore");
var randomNum;  
var viewHighScore = document.getElementById("score");
var startPage;

var startQuiz = function(){
    startPage = document.getElementById("start-page");
    startPage.remove();
    populateQuestion();
    countDown();
};

function countDown(){
    var timer = setInterval(function() {
        timerElement.innerText = timeLeft--;
        if(timeLeft < 0) {
            clearInterval(timer) 
            stopQuiz();
        }
    }, 1000);
}

function populateQuestion(){
    if(questions.length == 0){
        stopQuiz();   
    }

    randomNum = Math.floor(Math.random() * questions.length);
    let q = document.createElement("h1");
    let queue = document.getElementById("quizQuestions");
    let answer = questions[randomNum].answer;

    queue.innerHTML = "";
    q.innerText = questions[randomNum].question;

    queue.append(q);

    let inputQueue = document.getElementById("quizQuestions");
    let optionArray = questions[randomNum].options;

    optionArray.forEach((val, index) => {
        let optionButton = document.createElement("button");
        optionButton.innerText = val;

        optionButton.setAttribute("name", index);
        optionButton.setAttribute("value", answer);
        optionButton.addEventListener("click", validateQuestion);

        inputQueue.append(optionButton);
    });
}


function validateQuestion(event){
    event.preventDefault();

    let correctAnswer = event.target.value;
    let userAnswer = event.target.name;
    let optionList = document.getElementById("quizQuestions").getElementsByTagName("button");
    
    if(userAnswer == correctAnswer){
        timeLeft = timeLeft + 20;
        userScore = userScore + 5;
        questions.splice(randomNum, 1);
        populateQuestion();
    } else if (userAnswer != correctAnswer && userScore > 0){
        userScore = userScore -1;
        populateQuestion();
    }
    else if(userAnswer != correctAnswer && userScore == 0){
        userScore = userScore -1;
        stopQuiz();
    }
}

function stopQuiz(){
    let username = prompt("The quiz is over! Please enter your name");
    localStorage.setItem(username, userScore);
    showScore();
}

function backToStart(event){
    event.preventDefault();
    let quizQ = document.getElementById("quizQuestions");
    let highscoreDisplay = document.getElementById("highScore");
    console.log(startPage);

   // startPage.style.display = "flex";
    //quizQ.remove();
    //highscoreDisplay.remove();
}

function showScore(){
    let quizQ = document.getElementById("quizQuestions");
    let highscoreDisplay = document.getElementById("highScore");
    let backButton = document.createElement("button");
    let title = document.createElement("h1");
    let allScores = [];
    
    quizQ.remove();
    startPage.remove();

    title.innerText = "High Scores";
    highscoreDisplay.append(title);
    backButton.innerText = "Go Back";

    for (var i = 0; i < localStorage.length; i++){
        allScores.push({
            "user": localStorage.key(i),
            "score": localStorage.getItem(localStorage.key(i))
        });
    };

    allScores = allScores.sort(function (a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < allScores.length; i++){
        let users = document.createElement("section");
        users.setAttribute("class", "userScore");
        users.innerText = (i + 1) + ". " + allScores[i].user + ": " + allScores[i].score;
        highscoreDisplay.append(users);
    }

    highscoreDisplay.append(backButton);
    backButton.addEventListener("click", backToStart);
}

startButton.addEventListener("click", startQuiz);
viewHighScore.addEventListener("click", showScore);

