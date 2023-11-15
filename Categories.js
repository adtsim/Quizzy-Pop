// const value = localStorage.getItem('nameInput');
// value.innerHTML=value;

document.addEventListener("DOMContentLoaded", function() {
    // Access the player name from localStorage
    const playerName = localStorage.getItem("playerName");

    if (playerName) {
        console.log("Player's name retrieved from localStorage: " + playerName);

        // Display the player's name in the HTML element with id "playerName"
        const playerNameElement = document.getElementById("playerName");
        playerNameElement.textContent = "Hello, " + playerName + "!";
    } else {
        console.log("Player's name not found in localStorage.");
    }
});