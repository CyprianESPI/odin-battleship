import Game from "./components/game";
import Styles from "./styles.css";

// ================= //
// Main
// ================= //
function main() {
    console.log("Initializing...");

    const boardHuman = document.getElementById("board-human");
    const boardComputer = document.getElementById("board-computer");
    const game = new Game(boardHuman, boardComputer);

    // Get url param location
    const params = new URLSearchParams(document.location.search);
    console.log(params);
    const p1Name = params.get("p1");
    const p2Name = params.get("p2");
    console.log(p1Name);
    console.log(p2Name);
    if (p1Name === null || p1Name === "") {
        const dialog = document.getElementById("dialog-solo");
        dialog.showModal();
    }

    // Manage add/remove player 2
    const addPlayer2Btn = document.getElementById("add-p2-btn");
    const removePlayer2Btn = document.getElementById("remove-p2-btn");
    if (p2Name === null || p2Name === "") {
        // By default add is enabled and remove is disabled
        addPlayer2Btn.addEventListener('click', (e) => {
            const dialog = document.getElementById("dialog-multi");
            document.getElementById("p1-multi").value = p1Name;
            dialog.showModal();
        });

        // Create solo player game
        game.newGame(p1Name, 0, "CPU", 0);

    } else {
        addPlayer2Btn.classList.replace('enabled', 'disabled');
        removePlayer2Btn.classList.replace('disabled', 'enabled');
        removePlayer2Btn.addEventListener('click', (e) => {
            document.getElementById("p1-solo").value = p1Name;
            // Use the form to go reload page without 2nd player
            document.getElementById("form-solo").submit();
        });

        // Create two player local game
        game.newMultiplayerGame(p1Name, 0, p2Name, 0);
    }

    document.getElementById("oponent-fleet-header").innerText = game.p2.name;
    document.getElementById("your-fleet-header").innerText = game.p1.name ?? "You";
    const restartBtnHeader = document.getElementById("restart-btn-header");
    const restartBtnModal = document.getElementById("restart-btn-modal");
    [restartBtnHeader, restartBtnModal].forEach((btn) => btn.addEventListener('click', () => {
        game.newGame(p1Name, game.p1.wins, "CPU", game.p2.wins);
        const dialog = document.getElementById("dialog-game-over");
        dialog.close();
    }));

    console.log("Initialized!");
}

main();