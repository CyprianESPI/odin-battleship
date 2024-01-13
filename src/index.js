import Game from "./components/game";
import GameUi from "./components/game.ui";
import Styles from "./styles.css";

function apiVisits(username) {
    const url = "https://script.google.com/macros/s/AKfycbzzZp7TaHWN-agOOuNJxLEhEEOC6rFgl5LfbqU59i5DQnzcyO7LNC23D6GGvgIQn5zJ/exec";
    fetch(`${url}?username=${username}`, {
        method: 'GET',
        mode: "cors", // no-cors, *cors, same-origin);
        // options here, like the method (GET, POST, etc.) and maybe headers for authentication (this will depend on what the AlphaVantage API wants)
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = response.json(); // assuming they return json
        console.log(json);
        return json;
    }).then(body => {
        // do what you want with the response body here
    });
}


// ================= //
// Main
// ================= //
function main() {
    console.log("Initializing...");

    const boardHuman = document.getElementById("board-human");
    const boardComputer = document.getElementById("board-computer");
    const game = new GameUi(boardHuman, boardComputer);
    let gameType = Game.Type.solo;

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
    } else {
        apiVisits(p1Name);
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

        // Solo player game
        gameType = Game.Type.solo;
    } else {
        addPlayer2Btn.classList.replace('enabled', 'disabled');
        removePlayer2Btn.classList.replace('disabled', 'enabled');
        removePlayer2Btn.addEventListener('click', (e) => {
            document.getElementById("p1-solo").value = p1Name;
            // Use the form to go reload page without 2nd player
            document.getElementById("form-solo").submit();
        });

        // Two player local game
        gameType = Game.Type.multiLocal;
        apiVisits(p2Name);
    }

    // Start a new game
    game.newGame(gameType, p1Name, 0, p2Name, 0);

    document.getElementById("oponent-fleet-header").innerText = game.p2.name;
    document.getElementById("your-fleet-header").innerText = game.p1.name ?? "You";
    const restartBtnHeader = document.getElementById("restart-btn-header");
    const restartBtnModal = document.getElementById("restart-btn-modal");
    [restartBtnHeader, restartBtnModal].forEach((btn) => btn.addEventListener('click', () => {
        game.newGame(gameType, p1Name, game.p1.wins, p2Name, game.p2.wins);
        const dialog = document.getElementById("dialog-game-over");
        dialog.close();
    }));

    console.log("Initialized!");
}

main();