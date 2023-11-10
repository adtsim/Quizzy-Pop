
function getPlayerNameFromLocalStorage() {
    return localStorage.getItem("playerName");
}

document.addEventListener("DOMContentLoaded", function() {
    const playerName = getPlayerNameFromLocalStorage();

    if (playerName) {
        console.log("Player's name retrieved from localStorage: " + playerName);
    } else {
        console.log("Player's name not found in localStorage.");
    }
});

// Export the function for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { getPlayerNameFromLocalStorage };
}
