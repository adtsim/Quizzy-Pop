document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-quiz");
    const nameInput = document.getElementById("name");

    startButton.addEventListener("click", function() {
        const playerName = nameInput.value.trim(); // Trim the input to remove leading and trailing spaces

        if (playerName === "") {
            alert("Please enter your name!");
        } else {
            console.log(`Starting the quiz for ${playerName}`);
            storePlayerName(playerName);
            hideWelcomePage();
        }
    });

    function storePlayerName(name) {
        // Store the player name in localStorage
        localStorage.setItem("playerName", name);
    }

    function hideWelcomePage() {
        // Close the welcome page if needed.
        const welcomePage = document.querySelector(".welcome-page");
        if (welcomePage) {
            welcomePage.style.display = "none";
        }
    }
});
