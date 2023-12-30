import Player from "./player";

class Game {
    constructor() {
        this.newGame();
    }

    newGame() {
        this.player = new Player("You");
        this.computer = new Player("CPU");
        this.players = [this.player, this.computer];
        for (let p of this.players) {
            p.shuffleShips();
        }
    }
}
export default Game;