
function getPlayerName() {
    return localStorage.getItem("playerName");
}

document.addEventListener("DOMContentLoaded", function() {
    // Access the player name from localStorage
    const playerName = getPlayerNameFromLocalStorage();

    if (playerName) {
        console.log("Player's name retrieved from localStorage: " + playerName);
    } else {
        console.log("Player's name not found in localStorage.");
    }
});

// Export the function for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { getPlayerName };
}