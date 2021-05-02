// An array of objects whose items are the question, the wrong answers, and the right answer
var questions = [
    {
        "question": "What can you use to turn an array into a string when put into localStorage?",
        "wrongOps": ["array.parse","stringify","make.string", "makestring.JSON"],
        "correctOp": "JSON.stringify"
    },
    {
        "question": "jQuery is a Javascript ______",
        "wrongOps": ["container","substitute","type", "variant"],
        "correctOp": "library"
    },
    {
        "question": "If you wanted to make a responsive application, what CSS display property would you probably use?",
        "wrongOps": ["flexable","magic-missile","mobile-first", "responsive"],
        "correctOp": "flexbox"
    },
    {
        "question": "Bootstrap can be used to create stylized applications quickly, and is an example of a(n) _______",
        "wrongOps": ["effective tool","local API","web styler", "library"],
        "correctOp": "third-party API"
    },
    {
        "question": "In layman's terms, what does the kernel do?",
        "wrongOps": ["turns into popcorn","moderates data","moderates power", "initializes software"],
        "correctOp": "manages hard/software"
    }
];
var body = document.body;
var score = 0;

// Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Countdown function
var timeLeft = 59;
timerEl = document.getElementById("timerP");
function countdown() {  
    var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
        timerEl.textContent = "";
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
    } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
    }
    }, 1000);
}
var ulEl = document.createElement("ul")
var liEl = document.createElement("il")
player = "";

// Hiding the question and answer fields, as well as the timer
hidded = document.getElementsByClassName("hide");
for (i = 0; i < hidded.length; i++) {
    hidded[i].style.display = "none";
}
var f = 0;
var k = 0;

// Start button functionality
startButton = document.getElementById("startButton");
startButton.addEventListener("click", theQuiz);

answerButtons = document.getElementsByClassName("answers");
questionEl = document.getElementById("question")

// The function for the entire quiz
function theQuiz() {
    // Reveal hidden elements
    for (i = 0; i < hidded.length; i++) {
        hidded[i].style.display = "flex";
    }
    // Start countdown
    countdown();
    // Hide start button
    startButton.style.display = "none";
    // Shuffle the array with the question objects
    shuffleArray(questions);
    theQuestionInvoker();
    if (timeLeft <= 0) {
        theEnd();
    }
}

function theQuestionInvoker () {
    if (k < questions.length) {
        questionObj = questions[k];
        k++;
        questionEl.textContent = questionObj.question;
        answers = [];
        for (s = 0; s < questionObj.wrongOps.length; s++) {
            answers.push(questionObj.wrongOps[s]);
        }
        answers.push(questionObj.correctOp);
        shuffleArray(answers);
        for (j = 0; j < answers.length; j++) {
            answerButtons[j].textContent = answers[j];
            if (answers[j] !== questionObj.correctOp) {
                answerButtons[j].setAttribute("class", "answers incorrect")
            } else {
                answerButtons[j].setAttribute("class", "answers correct")
            }
        }
        for (t = 0; t < answerButtons.length; t++) {
            answerButtons[t].addEventListener("click", function(event) {
                if (event.target.matches(".correct")) {
                    score++;
                } else {
                    timeLeft -= 5;
                }
                theQuestionInvoker();
                // TODO: Get the theEnd function to run after either the timeLeft reaches zero or the user answers all questions
            });
        } 
    }
}
tempScores = [];
localStorage.setItem("scores", tempScores);
// End screen function 
// TODO: overlay the scores to the relevant <p> elements
function theEnd() {
    localStorage.setItem("new-score", JSON.stringify(score));
    var player = prompt("What's your name (three letters only)?")
    player = 
    endScore = score + " " + player;
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores == null) {
        storedScores = [];
    }
    storedScores.push(endScore);
    localStorage.setItem("scores", storedScores);
    storedScores = storedScores.reverse();
    //TODO: Create a <ul> in HTML, hide it, make it appear here, then populate it with the values in localStorage
    questionEl.textContent = "Recent Scores:";
    questionEl.style = "text-decoration:underline";
    answerButtons.style.display = "none";
}
