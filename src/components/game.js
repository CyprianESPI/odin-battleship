import Player from "./player";

class Game {
    static Type = {
        solo: 0,
        multiLocal: 1,
        multiOnline: 2,
    }

    constructor(p1Board, p2Board) {
        this.p1Board = p1Board;
        this.p2Board = p2Board;
        this.type = Game.Type.solo;
    }

    newGame(gameType, p1Name, p1Wins, p2Name, p2Wins) {
        this.type = gameType;
        this.p1 = new Player(p1Name, p1Wins);
        this.p2 = new Player(p2Name, p2Wins);
        this.players = [this.p1, this.p2];
        this.currentPlayer = this.p1;
        for (let p of this.players) {
            p.shuffleShips();
        }

        // Only allow to click on oponent's board
        this.p2.board.setEnabled(true);
        this.render();
        // TODO: add multi
        //this.newMutiplayerGameOnline();
    }

    switchPlayer() {
        for (let p of this.players) {
            p.board.setEnabled(!p.board.enabled);
        }
        this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1;
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
            const hit = this.computer.playRandom(this.p1);
            console.log("setTimeout", hit);
            if (hit) {
                navigator.vibrate(200);
                this.p1Board.classList.add('shake');
                setTimeout(() => {
                    this.p1Board.classList.remove('shake')
                }, 200);
                this.checkGameOver();
                // Recursive call
                this.computerPlay();
            } else {
                this.p1Board.classList.remove('disabled');
                this.p2Board.classList.remove('disabled');
                this.p1Board.classList.remove('shake');
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

    play(coordinates) {
        const oponent = this.getOponent();
        const oponentBoard = this.getOponentBoard();
        const hit = this.currentPlayer.play(oponent, coordinates);
        // Render must happen now to update board state
        this.render();
        // Play again on hit
        if (hit) {
            navigator.vibrate(200);
            oponentBoard.classList.add('shake');
            setTimeout(() => {
                oponentBoard.classList.remove('shake');
            }, 200);
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
        } else if (this.p1.board.gameOver()) {
            document.getElementById("game-over-result").innerText = "You lose...";
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