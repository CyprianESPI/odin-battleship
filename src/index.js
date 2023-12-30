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

    console.log("Initialized!");
}

main();