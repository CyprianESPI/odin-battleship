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
        this.currentPlayer = this.human;
        this.players = [this.human, this.computer];
        for (let p of this.players) {
            p.shuffleShips();
        }
        // Only allow to click on computer's board
        this.computer.board.setEnabled(true);
    }

    play(coordinates) {
        if (this.currentPlayer == this.human) {
            this.currentPlayer.play(this.computer, coordinates);
            this.render();

            this.currentPlayer = this.computer;
        } else if (this.currentPlayer == this.computer) {
            this.currentPlayer.playRandom(this.human, coordinates);
            this.render();

            this.currentPlayer = this.human;
        }
    }

    render() {
        this.human.board.render(this.humanBoard, this);
        this.computer.board.render(this.computerBoard, this);
    }
}
export default Game;