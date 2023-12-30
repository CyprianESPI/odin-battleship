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

    play(coordinates) {
        // When the human plays, the computer plays right after
        this.human.play(this.computer, coordinates);
        this.computer.playRandom(this.human);
        this.render();

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