var currentQuestion = 0;
var score = 0;
var quizData;

// Fetch the JSON data from the file
fetch('logo_questions.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        console.log(quizData);
        loadQuestion();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function loadQuestion() {
    var questionContainer = document.getElementById('question-container');
    var optionsContainer = document.getElementById('options-container');
    var imageContainer = document.getElementById('image-container');
    var currentQuizData = quizData.companies[currentQuestion];

    questionContainer.innerHTML = '<p>' + currentQuizData.question + '</p>';
    optionsContainer.innerHTML = '';

    currentQuizData.options.forEach(function (option, index) {
        optionsContainer.innerHTML += '<button onclick="checkAnswer(' + index + ')">' + option + '</button>';
    });

    var image = document.createElement('img');
    image.src = currentQuizData.image;
    image.alt = 'Logo';
    imageContainer.innerHTML = ''; // Clear previous image
    imageContainer.appendChild(image);
}

function checkAnswer(answerIndex) {
    var currentQuizData = quizData.companies[currentQuestion];

    if (currentQuizData.options[answerIndex] === currentQuizData.answer) {
        score++;
    }

    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.companies.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    var quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '<h2>Quiz Completed!</h2><p>Your Score: ' + score + ' out of ' + quizData.companies.length + '</p>';
}
