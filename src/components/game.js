import Player from "./player";

class Game {
    constructor(humanBoard, computerBoard) {
        this.humanBoard = humanBoard;
        this.computerBoard = computerBoard;
        this.newGame();
    }

    newGame() {
        this.human = new Player("You");
        this.computer = new Player("CPU");
        this.players = [this.human, this.computer];
        for (let p of this.players) {
            p.shuffleShips();
        }
        // Only allow to click on computer's board
        this.computer.board.setEnabled(true);
        this.render();
    }


    computerPlayDelayed() {
        const delayMs = 2000;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.computer.playRandom(this.human));
            }, delayMs);
        });
    }

    computerPlay() {
        this.humanBoard.classList.add('disabled');
        this.computerBoard.classList.add('disabled');
        console.log("computerPlay", this.humanBoard, this.computerBoard);
        const delayMs = 1000;
        setTimeout(() => {
            const hit = this.computer.playRandom(this.human);
            console.log("setTimeout", hit);
            if (hit) {
                this.computerPlay();
            }
            this.humanBoard.classList.remove('disabled');
            this.computerBoard.classList.remove('disabled');
            this.render();
        }, delayMs);
    }

    play(coordinates) {
        // When the human plays, the computer plays right after
        const hit = this.human.play(this.computer, coordinates);
        this.render();
        // If human hit, do not let the computer play
        if (hit) {
            return;
        }

        // If computer hit, do not let the human play
        this.computerPlay();

        // This should happen after the render as it's a block call
        if (this.computer.board.gameOver()) {
            alert("You win!\nPlay again?");
            this.newGame();
        } else if (this.human.board.gameOver()) {
            alert("You lose...\nPlay again?");
            this.newGame();
        }
    }

    render() {
        this.human.board.render(this.humanBoard, this);
        this.computer.board.render(this.computerBoard, this);
    }
}
export default Game;