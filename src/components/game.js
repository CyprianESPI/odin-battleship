import Player from "./player";

class Game {
    constructor() {
        this.newGame();
    }

    newGame() {
        this.human = new Player("You");
        this.computer = new Player("CPU");
        this.players = [this.human, this.computer];
        for (let p of this.players) {
            p.shuffleShips();
        }
    }

    render(humanBoard, computerBoard) {
        this.human.board.render(humanBoard, this.computer.board);
        this.computer.board.render(computerBoard, this.human.board);
    }
}
export default Game;