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
        // Not my code :(
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (var i = this.remainingPlays.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.remainingPlays[i];
            this.remainingPlays[i] = this.remainingPlays[j];
            this.remainingPlays[j] = temp;
        }
    }

    play(oponent, coordinates) {
        this.plays.push(coordinates);
        Utils.removeObjFromArray(this.remainingPlays, coordinates);
        const hit = oponent.board.receiveAttack(coordinates);
        return hit;
    }

    playRandom(oponent) {
        const coordinates = this.remainingPlays.pop();
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