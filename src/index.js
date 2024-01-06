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
    const userName = params.get("user-name");
    console.log(userName);
    if (userName === null || userName === "") {
        const dialog = document.getElementById("dialog-user-name");
        dialog.showModal();
    }

    const boardHuman = document.getElementById("board-human");
    const boardComputer = document.getElementById("board-computer");
    const game = new Game(boardHuman, boardComputer);
    game.newGame(userName, 0, "CPU", 0);
    document.getElementById("oponent-fleet-header").innerText = game.computer.name;
    document.getElementById("your-fleet-header").innerText = game.human.name ?? "You";

    const restartBtnHeader = document.getElementById("restart-btn-header");
    const restartBtnModal = document.getElementById("restart-btn-modal");
    [restartBtnHeader, restartBtnModal].forEach((btn) => btn.addEventListener('click', () => {
        game.newGame(userName, game.human.wins, "CPU", game.computer.wins);
        const dialog = document.getElementById("dialog-game-over");
        dialog.close();
    }));

    console.log("Initialized!");
}

main();