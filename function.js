let maxRange = 10; 
let numQuestions = 5;
let correctAnswers = 0;

let questionsRemain = numQuestions;

let questionsHistory = [];

function setRange() {
    maxRange = parseInt(document.getElementById("maxRange").value) || 10;
}

function setNumQuestions() {
    numQuestions = parseInt(document.getElementById("numQuestions").value) || 5;
    questionsRemain = numQuestions;
}

function isAdditionEnabled() {
    return document.getElementById("addCheckbox").checked;
}

function isSubtractionEnabled() {
    return document.getElementById("subtractCheckbox").checked;
}

function isMultiplicationEnabled() {
    return document.getElementById("multiplyCheckbox").checked;
}

function isDivisionEnabled() {
    return document.getElementById("divideCheckbox").checked;
}

function generateAddQuestion() {
    const num1 = Math.floor(Math.random() * maxRange);
    const num2 = Math.floor(Math.random() * (maxRange-num1));
    document.getElementById("num1").textContent = num1;
    document.getElementById("operator").textContent = "+";
    document.getElementById("num2").textContent = num2;
    document.getElementById("answer").value = "";
}

function generateMinusQuestion() {
    const num1 = Math.floor(Math.random() * maxRange);
    const num2 = Math.floor(Math.random() * num1);
    document.getElementById("num1").textContent = num1;
    document.getElementById("operator").textContent = "-";
    document.getElementById("num2").textContent = num2;
    document.getElementById("answer").value = "";
}

function generateMultiplyQuestion() {
    const num1 = Math.floor(Math.random() * Math.sqrt(maxRange)) + 1;
    const num2 = Math.floor(Math.random() * (maxRange/num1));
    document.getElementById("num1").textContent = num1;
    document.getElementById("operator").textContent = "x";
    document.getElementById("num2").textContent = num2;
    document.getElementById("answer").value = "";
}

function generateDivisionQuestion() {
    const divisor = Math.floor(Math.random() * Math.sqrt(maxRange)) + 1;
    const num2 = Math.floor(Math.random() * (maxRange/divisor));
    const num1 = divisor * num2;
    document.getElementById("num1").textContent = num1;
    document.getElementById("operator").textContent = "÷";
    document.getElementById("num2").textContent = divisor;
    document.getElementById("answer").value = "";
}

function generateQuestion() {
    const availableQuestionTypes = [];

    if (isAdditionEnabled()) {
        availableQuestionTypes.push(generateAddQuestion);
    }
    if (isSubtractionEnabled()) {
        availableQuestionTypes.push(generateMinusQuestion);
    }
    if (isMultiplicationEnabled()) {
        availableQuestionTypes.push(generateMultiplyQuestion);
    }
    if (isDivisionEnabled()) {
        availableQuestionTypes.push(generateDivisionQuestion);
    }

    const randomIndex = Math.floor(Math.random() * availableQuestionTypes.length);
    availableQuestionTypes[randomIndex]();

    document.getElementById("questionRemain").textContent = questionsRemain+" To Go!";
    questionsRemain--;
    
}


function checkEnterKey(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
}

function toggleCheckbox(id) {
    const checkbox = document.getElementById(id);
    checkbox.checked = !checkbox.checked;
}

function checkAnswer() {
    const num1 = parseInt(document.getElementById("num1").textContent);
    const num2 = parseInt(document.getElementById("num2").textContent);
    const operator = document.getElementById("operator").textContent;
    const userAnswer = parseInt(document.getElementById("answer").value);
    let correctAnswer;

    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "x":
            correctAnswer = num1 * num2;
            break;
        case "÷":
            correctAnswer = num1 / num2;
            break;
    }

    if (userAnswer === correctAnswer) {
        document.getElementById("message").textContent = "Correct! Well done.";
        correctAnswers++;
        document.getElementById("correctCount").textContent = correctAnswers;
    } else {
        document.getElementById("message").textContent = "Incorrect!";
    }

    const questionText = `${num1} ${operator} ${num2} = ${userAnswer}`;
    const isCorrect = userAnswer === correctAnswer;
    questionsHistory.push({
        text: questionText,
        isCorrect: isCorrect,
    });

    if(questionsRemain > 0){
        generateQuestion();
    }
    else{
        showResults();
    }
}

function resetQuestions() {
    correctAnswers = 0;
    questionsHistory = [];
    document.getElementById("correctCount").textContent = correctAnswers;
    document.getElementById("addCheckbox").checked = true;
    document.getElementById("subtractCheckbox").checked = true;
    document.getElementById("multiplyCheckbox").checked = true;
    document.getElementById("divideCheckbox").checked = true;

    document.getElementById("resultSection").style.display = "none";
    document.getElementById("questionSection").style.display = "none";
    document.getElementById("resetSection").style.display = "none";
    document.getElementById("questionCategory").style.display = "block";

    const resultElement = document.getElementById("result_3");
    while (resultElement.firstChild) {
        resultElement.removeChild(resultElement.firstChild);
    }

}

function startPractice() {
    document.getElementById("questionSection").style.display = "block";
    document.getElementById("resetSection").style.display = "block";
    document.getElementById("questionCategory").style.display = "none";

    setRange();
    setNumQuestions();
    generateQuestion();

}

function showResults() {
    document.getElementById("questionSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    document.getElementById("result_1").textContent = "You answered "+ numQuestions +" questions";
    document.getElementById("result_2").textContent = correctAnswers +" are correct!";

    displayResult();
}

function displayResult() {
    const resultElement = document.getElementById("result_3");
    for(const entry of questionsHistory){
        const paragraph = document.createElement("p");
        paragraph.textContent = entry.text;

        if (entry.isCorrect) {
            paragraph.style.color = "green";
        }else {
            paragraph.style.color = "red";
        }

        resultElement.appendChild(paragraph);
    }
}

document.getElementById("submit").addEventListener("click", checkAnswer);
