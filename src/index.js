import Game from "./components/game";
import Styles from "./styles.css";

// ================= //
// Globals
// ================= //
const GAME = new Game();

const BOARD_HUMAN = document.getElementById("board-human");
const BOARD_COMPUTER = document.getElementById("board-computer");

// ================= //
// DOM interaction
// ================= //
function render() {
    GAME.render(BOARD_HUMAN, BOARD_COMPUTER);
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