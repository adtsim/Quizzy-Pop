document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-quiz");
    const nameInput = document.getElementById("name");

    startButton.addEventListener("click", function() {
        const player_name = nameInput.value;
        if (player_name === "") { // Check if the input is an empty string
            alert("Please enter your name!");
        } else {
            console.log("Starting the quiz for " + player_name);
            // Store the player name in localStorage
            localStorage.setItem("playerName", player_name);
            // Close the welcome page if needed.
            document.querySelector(".welcome-page").style.display = "none";
        }
    });
});