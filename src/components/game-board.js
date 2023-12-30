import Utils from "./utils";

class GameBoard {
    static CellStatus = {
        water: 0,
        waterHit: 1,
        ship: 2,
        shipHit: 3,
    };

    constructor(size) {
        this.ships = [];
        this.size = size;
        this.grid = [];
        this.enabled = false;
        for (let row = 0; row < size; row++) {
            const row = [];
            for (let col = 0; col < size; col++) {
                row.push(GameBoard.CellStatus.water);
            }
            this.grid.push(row);
        }
    }

    moveShip(ship, direction) {
        for (let i = 0; i < ship.shipCoordinates.length; i++) {
            // replace ship cells by water cells
            this.grid[ship.shipCoordinates[i][0]][ship.shipCoordinates[i][1]] = GameBoard.CellStatus.water;
            // Update ship position
            ship.shipCoordinates[i][0] = ship.shipCoordinates[i][0] + direction[0];
            ship.shipCoordinates[i][1] = ship.shipCoordinates[i][1] + direction[1];
        }
        // Update grid cells to be a ship again
        for (let shipCoordinate of ship.shipCoordinates) {
            this.grid[shipCoordinate[0]][shipCoordinate[1]] = GameBoard.CellStatus.ship;
        }
    }

    // position/direction format: [x, y] <-> [col, row]
    // position is the edge of ship
    placeShip(ship, position, direction) {
        //console.log("placeShip", ship, position, direction);
        const shipCoordinates = [];
        for (let i = 0; i < ship.length; i++) {
            // Row and cols are confusing... be careful with index
            const row = position[1] + i * direction[1];
            const col = position[0] + i * direction[0];

            if (row < 0 || row >= this.size
                || col < 0 || col >= this.size) {
                // Do not allow ships to go oustide of board
                return false;
            } else if (this.grid[row][col] == GameBoard.CellStatus.ship) {
                // Do not allow to put two ships to overlap
                return false;
            } else {
                if ((row + 1 < this.size && this.grid[row + 1][col] == GameBoard.CellStatus.ship)
                    || (row - 1 >= 0 && this.grid[row - 1][col] == GameBoard.CellStatus.ship)
                    || (col + 1 < this.size && this.grid[row][col + 1] == GameBoard.CellStatus.ship)
                    || (col - 1 >= 0 && this.grid[row][col - 1] == GameBoard.CellStatus.ship)) {
                    // Do not allow adjacent ships
                    return false;
                } else if ((row + 1 < this.size && col + 1 < this.size && this.grid[row + 1][col + 1] == GameBoard.CellStatus.ship)
                    || (row + 1 < this.size && col - 1 >= 0 && this.grid[row + 1][col - 1] == GameBoard.CellStatus.ship)
                    || (row - 1 >= 0 && col + 1 < this.size && this.grid[row - 1][col + 1] == GameBoard.CellStatus.ship)
                    || (row - 1 >= 0 && col + 1 < this.size && this.grid[row - 1][col - 1] == GameBoard.CellStatus.ship)) {
                    // Do not allow diagonally adjacent ships
                    return false;
                }
            }
            shipCoordinates.push([row, col]);
        }

        // Add the ship coordinates property
        for (let shipCoordinate of shipCoordinates) {
            this.grid[shipCoordinate[0]][shipCoordinate[1]] = GameBoard.CellStatus.ship;
        }
        ship.shipCoordinates = shipCoordinates;
        this.ships.push(ship);
        return true;
    }

    // Returns true if a ship is hit
    receiveAttack(coordinates) {
        const row = coordinates[0];
        const col = coordinates[1];
        // Check if we hit a ship
        for (let ship of this.ships) {
            for (let coord of ship.shipCoordinates) {
                if (row == coord[0]
                    && col == coord[1]) {
                    ship.hit();
                    this.grid[row][col] = GameBoard.CellStatus.shipHit;
                    return true;
                }
            }
        }

        // Ship not hit...
        this.grid[row][col] = GameBoard.CellStatus.waterHit;
        return false;
    }

    gameOver() {
        for (let ship of this.ships) {
            if (!ship.isSunk())
                return false;
        }
        // All the ships are sunk
        return true;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    render(parent, game) {
        Utils.removeContent(parent);
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement("div");
                if (this.grid[row][col] === GameBoard.CellStatus.water) {
                    cell.className = "cell water";
                    // Can shoot at
                    if (this.enabled) {
                        cell.className += " clickable";
                        cell.addEventListener('click', (e) => {
                            console.log(`Firing at ${row}, ${col}`);
                            game.play([row, col]);
                        });
                    }
                } else if (this.grid[row][col] === GameBoard.CellStatus.waterHit) {
                    cell.className = "cell water-hit";
                } else if (this.grid[row][col] === GameBoard.CellStatus.ship) {
                    cell.className = "cell ship";
                    // Can shoot at
                    if (this.enabled) {
                        cell.className += " clickable";
                        cell.addEventListener('click', (e) => {
                            console.log(`Firing at ${row}, ${col}`);
                            game.play([row, col]);
                        });
                    }
                } else if (this.grid[row][col] === GameBoard.CellStatus.shipHit) {
                    cell.className = "cell ship-hit";
                }
                parent.appendChild(cell);
            }
        }
    }
}
export default GameBoard;