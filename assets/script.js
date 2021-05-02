// Create an array that holds all of the information for each question as objects
    var questions = [
    {
        "question": "placeholder question",
        "wrongOps": ["placeholder option","placeholder option","placeholder option"],
        "correctOp": "placeholder correct"
    },
    {
        "question": "placeholder question",
        "wrongOps": ["placeholder option","placeholder option","placeholder option"],
        "correctOp": "placeholder correct"
    },
    {
        "question": "placeholder question",
        "wrongOps": ["placeholder option","placeholder option","placeholder option"],
        "correctOp": "placeholder correct"
    },
    {
        "question": "placeholder question",
        "wrongOps": ["placeholder option","placeholder option","placeholder option"],
        "correctOp": "placeholder correct"
    },
    {
        "question": "placeholder question",
        "wrongOps": ["placeholder option","placeholder option","placeholder option"],
        "correctOp": "placeholder correct"
    }
];
var body = document.body;
// Use an algorithm to shuffle the objects in the array
// Durstenfeld Shuffle Algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
  function endScreen() {
    localStorage.setItem("new-score", JSON.stringify(score));
    h2El.textContent = "Good work!";
    ulEl.remove();
    var scoreList = document.createElement("ul");
    var player = prompt("What's your name (three letters only)?")
    player.length = 2;
    score = player + " " + score;
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores == null) {
        storedScores = [];
    }
    storedScores.push(score);
    localStorage.setItem("scores", storedScores);
    storedScores = storedScores.reverse();
    for (i = 0; i < storedScores.length; i++) {
        ilEl.textContent = storedScores[i];
        ulEl.appendChild(ilEl);
    }
}
// Create variables for score and player name and a function for the timer  
// Create a function that creates the HTML elements, styles them with css, and fills them with the first question object's items, then replaces the values in the elements with the items from the next object in the array after the user clicks an answer. Use a variable within the quiz function and, similar to a for loop, use it to iterate through the questions (questions[i])
function theQuiz() {
    var score = 0;
    var timeLeft = 59;
    function countdown() {  
        var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
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
    countdown();
    var qSpace = document.getElementById("q-space");
    var aSpace = document.getElementById("a-space");
    var h2El = document.createElement("h2");
    var ulEl = document.createElement("ul")
    var ilEl = document.createElement("il")
    var selectBtn = document.createElement("button")
    var answers = [];
    qSpace.appendChild(h2El);
    shuffleArray(questions);
    for (i = 0; i < questions.length; i++) {
        h2El.textContent = questions[i].question;
        answers = [];
        answers.push(questions[i].wrongOps);
        answers.push(questions[i].correctOp);
        shuffleArray(answers);
        aSpace.appendChild(ulEl);
        for (j = 0; j < answers.length; j++) {
            ilEl.textContent = answers[j];
            if (answers[j] === questions[i].correctOp.value) {
                ilEl.setAttribute("class", "correct")
                selectBtn.setAttribute("class", "correct")
            }
            ulEl.appendChild(ilEl);
            ilEl.appendChild(selectBtn);
            selectBtn.addEventListener("click", function(event) {
                if (event.target.matches(".correct")) {
                    score++;
                } else {
                    timeLeft -= 10;
                };
                var liRemove = document.querySelectorAll("li");
                liRemove.remove();
            })
        }
        if (timeLeft === 0) {
            break;
        }
    }
    if (timeLeft === 0) {
        endScreen();
    }

}
var timerEl = document.createElement("h3");
timerEl.textContent = "Timer";
body.appendChild(timerEl);
startBtnVar = document.querySelector("#begin");
startBtnVar.addEventListener("click", theQuiz);