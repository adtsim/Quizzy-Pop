var currentLevel = 'easy'; // Start with the easy level
var score = 0;
var currentQuestion = 0;
var quizData;

// Fetch the JSON data from the file
fetch('Geo.json')
    .then(response => response.json())
    .then(data => {
        quizData = data.questions;
        console.log(quizData);
        loadQuestion();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function loadQuestion() {
    var questionContainer = document.getElementById('question-container');
    var optionsContainer = document.getElementById('options-container');
    var imageContainer = document.getElementById('image-container');

    // Check if we have questions for the current level
    var questionsForCurrentLevel = quizData.filter(question => question.level === currentLevel);

    if (questionsForCurrentLevel.length === 0) {
        // No questions for the current level
        showResult();
        return;
    }

    var currentQuizData = questionsForCurrentLevel[currentQuestion];

    questionContainer.innerHTML = '<p>' + currentQuizData.question + '</p>';
    optionsContainer.innerHTML = '';

    currentQuizData.options.forEach(function (option, index) {
        optionsContainer.innerHTML += '<button onclick="checkAnswer(' + index + ')" id="option-' + index + '">' + option + '</button>';
    });

    
}

function checkAnswer(answerIndex) {
    var currentQuizData = getCurrentQuestion();
    var selectedOption = document.getElementById('option-' + answerIndex);

    if (currentQuizData.options[answerIndex] === currentQuizData.answer) {
        score++;
        selectedOption.style.backgroundColor = 'green';
    } else {
        selectedOption.style.backgroundColor = 'red';
    }

    // Disable all buttons after the user has selected an option
    var allButtons = document.querySelectorAll('#options-container button');
    allButtons.forEach(function (button) {
        button.disabled = true;
    });

    // Enable the "Next" button
    document.getElementById('next-button').disabled = false;
}



function getCurrentQuestion() {
    var questionsForCurrentLevel = quizData.filter(question => question.level === currentLevel);
    return questionsForCurrentLevel[currentQuestion];
}


function nextQuestion() {
    // Reset background color for all buttons
    var allButtons = document.querySelectorAll('#options-container button');
    allButtons.forEach(function (button) {
        button.style.backgroundColor = '';
        button.disabled = false;
    });

    // Move to the next question
    currentQuestion++;

    // Check if we have questions for the current level
    var questionsForCurrentLevel = quizData.filter(question => question.level === currentLevel);

    if (currentQuestion < questionsForCurrentLevel.length) {
        loadQuestion();
    } else {
        // No more questions for the current level
        if (currentLevel === 'easy' && score >= 7) {
            // If the easy level is completed with a score of 7 or more, show a message and move to the hard level
            var confirmation = confirm('Congratulations! You have scored 7 or more in the easy level. Do you want to proceed to the hard level?');
            if (confirmation) {
                currentLevel = 'hard';
                currentQuestion = 0; // Reset the question index for the hard level
                loadQuestion();
            } else {
                showResult();
            }
        } else {
            showResult();
        }
    }
}


function showResult() {
    var quizContainer = document.getElementById('quiz-container');
    if (currentLevel === 'easy' && score < 7) {
        quizContainer.innerHTML = '<h2>Quiz Completed!</h2><p>Your Score: ' + score + ' out of ' + (quizData.length) / 2 + '. The score is too low to proceed to the hard level.</p>';
    } else {
        var message = (currentLevel === 'easy') ? 'Well done! You\'ve completed the easy level.' : 'Quiz Completed!';
        quizContainer.innerHTML = '<h2>' + message + '</h2><p><b>Congratulations!<b><br>Your Score: ' + score + ' out of ' + quizData.length + '</p>';
    }
}