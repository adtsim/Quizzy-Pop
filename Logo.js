
var currentLevel = 'easy'; // Start with the easy level
var score = 0;
var currentQuestion = 0;
var quizData;

// Fetch the JSON data from the file
fetch('logo_questions.json')
    .then(response => response.json())
    .then(data => {
        quizData = data.companies;
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

    var image = document.createElement('img');
    image.src = currentQuizData.image;
    image.alt = 'Logo';
    imageContainer.innerHTML = ''; // Clear previous image
    imageContainer.appendChild(image);
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
    var resultMessage;
    var redirectButton;

    if (currentLevel === 'easy' && score < 7) {
        resultMessage = '<h2>Quiz Completed!</h2><p>Your Score: ' + score + ' out of ' + (quizData.length) / 2 + '. The score is too low to proceed to the hard level.</p>';
        redirectButton = '<button onclick="redirectToCategories()">Go to Categories</button>';
    } else {
        resultMessage = '<h2>Quiz Completed!</h2><p>Your Score: ' + score + ' out of ' + quizData.length + '</p>';
        if (currentLevel === 'hard') {
            redirectButton = '<button onclick="redirectToCategories()">Go to Categories</button>';
        } else {
            redirectButton = '';
        }
    }

    quizContainer.innerHTML = resultMessage + redirectButton;
}

function redirectToCategories() {
    // Replace 'categories.html' with the actual file path you want to redirect to
    window.location.href = 'Categories.html';
}

