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


function gameLoop() {
    console.log("gameLoop", GAME);

    if (GAME.currentPlayer == GAME.human) {
        // TODO: remove this section
        const msg = prompt("Your turn!\nEnter coordinates coma separated...", "3, 5");
        const nums = msg.split(",");
        const coordinates = [Number(nums[0]), Number(nums[1])];
        GAME.currentPlayer.play(GAME.computer, coordinates);
        GAME.currentPlayer = GAME.computer;
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