function startQuiz(playerName) {
    if (playerName === "") {
        alert("Please enter your name!");
    } else {
        console.log("Starting the quiz for " + playerName);
        storePlayerName(playerName);
        closeWelcomePage();
    }
}

function storePlayerName(playerName) {
    localStorage.setItem("playerName", playerName);
}

function closeWelcomePage() {
    document.querySelector(".welcome-page").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-quiz");
    const nameInput = document.getElementById("name");

    startButton.addEventListener("click", function() {
        startQuiz(nameInput.value);
    });
});

