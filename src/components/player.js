import GameBoard from "./game-board";
import Ship from "./ship";
import Utils from "./utils";

class Player {
    static boardSize = 10;

    constructor(name) {
        this.name = name;
        this.board = new GameBoard(Player.boardSize);
        this.ships = [
            new Ship(2, "corvette"),
            new Ship(3, "submarine"),
            new Ship(3, "destroyer"),
            new Ship(4, "cruiser"),
            new Ship(5, "aircraft"),
        ]
        this.plays = [];
        this.remainingPlays = [];
        for (let row = 0; row < Player.boardSize; row++) {
            for (let col = 0; col < Player.boardSize; col++) {
                this.remainingPlays.push([row, col]);
            }
        }
    }

    play(oponent, coordinates) {
        this.plays.push(coordinates);
        Utils.removeObjFromArray(coordinates);
        const hit = oponent.board.receiveAttack(coordinates);
        return hit;
    }

    playRandom(oponent) {
        const randomIndex = Math.floor(Math.random() * (this.remainingPlays.length - 1));
        const coordinates = this.remainingPlays[randomIndex];
        return this.play(oponent, coordinates);
    }

    shuffleShips() {
        const directions = [[1, 0], [0, 1]];
        // Randomly place ships
        for (let ship of this.ships) {
            let row = Math.floor(Math.random() * (Player.boardSize - 1));
            let col = Math.floor(Math.random() * (Player.boardSize - 1));
            let direction = Math.random() >= 0.5 ? directions[0] : directions[1];

            while (!this.board.placeShip(ship, [row, col], direction)) {
                row = Math.floor(Math.random() * (Player.boardSize - 1));
                col = Math.floor(Math.random() * (Player.boardSize - 1));
                direction = Math.random() >= 0.5 ? directions[0] : directions[1];
            }
        }
        console.log(this.board.ships);
    }
}
export default Player;