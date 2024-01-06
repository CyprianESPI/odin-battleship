import GameBoard from "./game-board";
import Ship from "./ship";
import Utils from "./utils";

class Player {
    static boardSize = 10;
    static peerConnectionConfig = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' } // Using Google's public STUN server
        ]
    };

    constructor(name) {
        this.wins = 0;
        this.name = name;
        // TODO: add multi
        //this.peerConnection = new RTCPeerConnection(Player.peerConnectionConfig);
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
        // Must happen before updating list of plays
        const hit = oponent.board.receiveAttack(coordinates);

        // Use grid status to update remaining plays
        for (let i = this.remainingPlays.length - 1; i >= 0; i--) {
            const row = this.remainingPlays[i][0];
            const col = this.remainingPlays[i][1];
            if (oponent.board.grid[row][col] === GameBoard.CellStatus.waterHit
                || oponent.board.grid[row][col] === GameBoard.CellStatus.waterEmpty
                || oponent.board.grid[row][col] === GameBoard.CellStatus.shipHit) {
                this.remainingPlays.splice(i, 1);
            }
        }

        if (hit && oponent.board.gameOver()) {
            this.wins++;
        }
        return hit;
    }

    playRandom(oponent) {
        const coordinates = this.remainingPlays.pop();
        const hit = this.play(oponent, coordinates);
        // Hard AI > target adjacent cells after a hit
        if (hit) {
            const targets = [];
            for (let i = this.remainingPlays.length - 1; i >= 0; i--) {
                const row = this.remainingPlays[i][0];
                const col = this.remainingPlays[i][1];

                // Only target right next to the ship
                const sameCol = Math.abs(row - coordinates[0]) === 1
                    && Math.abs(col - coordinates[1]) === 0;
                const sameRow = Math.abs(row - coordinates[0]) === 0
                    && Math.abs(col - coordinates[1]) === 1;
                if (sameCol || sameRow) {
                    this.remainingPlays.splice(i, 1);
                    targets.push([row, col]);
                }
            }

            targets.forEach((target) => {
                this.remainingPlays.push(target);
            });
        }

        return hit;
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