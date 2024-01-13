import Player from "./player";

class Game {
    static Type = {
        solo: 0,
        multiLocal: 1,
        multiOnline: 2,
    }

    constructor() {
        this.type = Game.Type.solo;
    }

    newGame(gameType, p1Name, p1Wins, p2Name, p2Wins) {
        this.type = gameType;
        this.p1 = new Player(p1Name, p1Wins);
        if (gameType === Game.Type.solo) {
            this.p2 = new Player("CPU", p2Wins);
        } else {
            this.p2 = new Player(p2Name, p2Wins);
        }

        this.players = [this.p1, this.p2];
        this.currentPlayer = this.p1;
        for (let p of this.players) {
            p.shuffleShips();
        }
    }

    switchPlayer() {
        for (let p of this.players) {
            p.board.setEnabled(!p.board.enabled);
        }
        this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1;
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

    getOponent() {
        return this.currentPlayer === this.p1 ? this.p2 : this.p1;
    }

    getOponentBoard() {
        return this.currentPlayer === this.p1 ? this.p2Board : this.p1Board;
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
        const oponent = this.getOponent();
        const hit = this.currentPlayer.play(oponent, coordinates);
        return hit;
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
        this.p1.board.render(this.p1Board, this);
        this.p2.board.render(this.p2Board, this);
    }
}
export default Game;