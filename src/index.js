import Game from "./components/game";
import Styles from "./styles.css";

// ================= //
// Main
// ================= //
function main() {
    console.log("Initializing...");

    // Get url param location
    const params = new URLSearchParams(document.location.search);
    console.log(params);

    const boardHuman = document.getElementById("board-human");
    const boardComputer = document.getElementById("board-computer");
    const game = new Game(boardHuman, boardComputer);

    const restartBtnHeader = document.getElementById("restart-btn-header");
    const restartBtnModal = document.getElementById("restart-btn-modal");
    [restartBtnHeader, restartBtnModal].forEach((btn) => btn.addEventListener('click', () => {
        game.newGame();
        const dialog = document.getElementById("dialog-game-over");
        dialog.close();
    }));

    console.log("Initialized!");
}

main();