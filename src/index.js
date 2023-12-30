import Game from "./components/game";
import Styles from "./styles.css";

// ================= //
// Globals
// ================= //
const BOARD_HUMAN = document.getElementById("board-human");
const BOARD_COMPUTER = document.getElementById("board-computer");
const GAME = new Game(BOARD_HUMAN, BOARD_COMPUTER);

// ================= //
// DOM interaction
// ================= //
function render() {
    GAME.render();
}


function gameLoop() {
    console.log("gameLoop", GAME);
    return;

    if (GAME.currentPlayer == GAME.human) {
        // Pass
    } else if (GAME.currentPlayer == GAME.computer) {
        GAME.currentPlayer.playRandom(GAME.human);
        GAME.currentPlayer = GAME.human;
    }

    render();
    // Recursive call
    setTimeout(gameLoop, 5000);
}

// ================= //
// Main
// ================= //
function main() {
    console.log("Initializing...");

    // Get url param location
    const params = new URLSearchParams(document.location.search);
    console.log(params);

    render();

    console.log("Initialized!");

    gameLoop();
}

main();