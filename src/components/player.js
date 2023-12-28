import GameBoard from "./game-board";
import Ship from "./ship";

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
        //this.shuffleShips();
    }

    play(oponent, coordinates) {
        this.plays.push(coordinates);
        const hit = oponent.board.receiveAttack(coordinates);
        return hit;
    }

    shuffleShips() {
        // Randomly place ships
        for (let ship of this.ships) {
            const row = Math.floor(Math.random() * (Player.boardSize - 1));
            const col = Math.floor(Math.random() * (Player.boardSize - 1));
            while (!this.board.placeShip(ship, [row, col], [1, 0])) {
                // Pass
            }
        }
        console.log(this.board.ships);
    }
}
export default Player;