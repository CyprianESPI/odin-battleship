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
}

main();