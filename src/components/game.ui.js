import Player from "./player";
import GameBoardUi from "./game-board.ui";
import Game from "./game";

class GameUi extends Game {
    constructor(p1Board, p2Board) {
        super();
        this.p1Board = p1Board;
        this.p2Board = p2Board;
    }

    newGame(gameType, p1Name, p1Wins, p2Name, p2Wins) {
        super.newGame(gameType, p1Name, p1Wins, p2Name, p2Wins);

        // Setup Ui - TODO: check why the switch here...
        this.p1Board.gameBoard = this.p2.board;
        this.p2Board.gameBoard = this.p1.board;
        // Only allow to click on oponent's board
        this.p1Board.gameBoard.setEnabled(true);
        this.render();
        // TODO: add multi
        this.newMutiplayerGameOnline();
    }

    newMutiplayerGameOnline() {
        // Try to connect
        console.log("connecting...");
        this.p1.connect();
    }

    switchPlayer() {
        super.switchPlayer();
        this.render();
        setTimeout(() => {
            this.p1Board.classList.add("blurred");
            this.p2Board.classList.add("blurred");
            setTimeout(() => {
                alert("It's a miss! Press ok to swap");
                if (this.currentPlayer === this.p1) {
                    this.p1Board.classList.remove("board-hidden");
                    this.p2Board.classList.add("board-hidden");
                } else {
                    this.p1Board.classList.add("board-hidden");
                    this.p2Board.classList.remove("board-hidden");
                }

                this.p1Board.classList.remove("blurred");
                this.p2Board.classList.remove("blurred");
            }, 500);
        }, 100);
    }

    computerPlay() {
        this.p1Board.classList.add('disabled');
        this.p2Board.classList.add('disabled');
        const delayMs = 500;
        setTimeout(() => {
            const hit = this.p2.playRandom(this.p1);
            if (hit) {
                this.shakeBoard(this.p1Board);
                this.checkGameOver();
                // Recursive call
                this.computerPlay();
            } else {
                this.p1Board.classList.remove('disabled');
                this.p2Board.classList.remove('disabled');
            }
            this.render();
        }, delayMs);
    }

    shakeBoard(board) {
        const shakeTimeMs = 200;
        navigator.vibrate(shakeTimeMs);
        board.classList.add('shake');
        setTimeout(() => {
            board.classList.remove('shake');
        }, shakeTimeMs);
    }

    play(coordinates) {
        const hit = super.play(coordinates);
        // Render must happen now to update board state
        this.render();
        // Play again on hit
        if (hit) {
            this.shakeBoard(super.getOponentBoard());
            this.checkGameOver();
            // Exit
            return;
        }

        switch (this.type) {
            // Local Multiplayer Game
            case Game.Type.multiLocal:
                this.switchPlayer();
                break;
            // Solo game
            case Game.Type.solo:
                this.computerPlay();
                break;
        }
    }

    checkGameOver() {
        const dialog = document.getElementById("dialog-game-over");
        // Update dialog content
        if (this.p2.board.gameOver()) {
            document.getElementById("game-over-result").innerText = "You win!";
            dialog.classList.add("win");
            dialog.classList.remove("loss");
        } else if (this.p1.board.gameOver()) {
            document.getElementById("game-over-result").innerText = "You lose...";
            dialog.classList.remove("win");
            dialog.classList.add("loss");
        } else {
            return;
        }
        document.getElementById("game-over-name-cpu").innerText = this.p2.name;
        document.getElementById("game-over-name-you").innerText = this.p1.name;
        document.getElementById("game-over-score-cpu").innerText = this.p2.wins;
        document.getElementById("game-over-score-you").innerText = this.p1.wins;
        dialog.showModal();
    }

    render() {
        const p1 = new GameBoardUi(this.p1Board, 10);
        // Copy properties from GameBoard to GameBoardUi object
        Object.assign(p1, this.p1.board);
        p1.render(this);
        const p2 = new GameBoardUi(this.p2Board, 10);
        Object.assign(p2, this.p2.board);
        p2.render(this);
    }
}
export default GameUi;