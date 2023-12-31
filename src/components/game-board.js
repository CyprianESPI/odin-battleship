import Utils from "./utils";

class GameBoard {
    static Direction = {
        right: [0, 1],
        left: [0, -1],
        up: [1, 0],
        down: [-1, 0],
    }

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

    isMoveAllowed(ship, trans) {
        if (ship.isDamaged()) {
            return false;
        }

        const newShipPositions = []
        for (let shipCoordinate of ship.shipCoordinates) {
            // Row and cols are confusing... be careful with index
            const row = shipCoordinate[0] + trans[0];
            const col = shipCoordinate[1] + trans[1];

            if (row < 0 || row >= this.size
                || col < 0 || col >= this.size) {
                // Do not allow ships to go oustide of board
                return false;
            }
            newShipPositions.push([row, col]);
        }

        // Prepare 9 squares around each position
        const newAdjShipPositions = [];
        for (let newShipPos of newShipPositions) {
            newAdjShipPositions.push([newShipPos[0] + 1, newShipPos[1] + 1]);
            newAdjShipPositions.push([newShipPos[0] + 1, newShipPos[1] + 0]);
            newAdjShipPositions.push([newShipPos[0] + 1, newShipPos[1] - 1]);
            newAdjShipPositions.push([newShipPos[0] + 0, newShipPos[1] + 1]);
            newAdjShipPositions.push([newShipPos[0] + 0, newShipPos[1] + 0]);
            newAdjShipPositions.push([newShipPos[0] + 0, newShipPos[1] - 1]);
            newAdjShipPositions.push([newShipPos[0] - 1, newShipPos[1] + 1]);
            newAdjShipPositions.push([newShipPos[0] - 1, newShipPos[1] + 0]);
            newAdjShipPositions.push([newShipPos[0] - 1, newShipPos[1] - 1]);
        }

        for (let newAdjShipPos of newAdjShipPositions) {
            if (newAdjShipPos[0] < 0 || newAdjShipPos[0] >= this.size
                || newAdjShipPos[1] < 0 || newAdjShipPos[1] >= this.size) {
                // Do not allow ships to go oustide of board
                continue;
            }
            if (this.grid[newAdjShipPos[0]][newAdjShipPos[1]] === GameBoard.CellStatus.ship) {
                // Check if it is really another ship
                if (ship.shipCoordinates.find(coords => coords[0] === newAdjShipPos[0] && coords[1] === newAdjShipPos[1])) {
                    continue;
                }
                return false;
            } else if (this.grid[newAdjShipPos[0]][newAdjShipPos[1]] === GameBoard.CellStatus.waterHit) {
                // Do not allow to move onto a cell which already received a hit
                if (newShipPositions.find(coords => this.grid[coords[0]][coords[1]] === GameBoard.CellStatus.waterHit)) {
                    return false;
                }
            }
        }

        return true;
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
        // TODO: refactor this code
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

    createMoveButton(direction, coords, parent, game, ship) {
        const btn = document.createElement("button");
        btn.innerText = "chevron_right";
        let trans = [0, 0];
        if (direction === GameBoard.Direction.right) {
            // Rotate goes clockwise
            btn.style.transform = "rotate(0deg)";
            trans = [0, 1];
        } else if (direction === GameBoard.Direction.left) {
            btn.style.transform = "rotate(180deg)";
            trans = [0, -1];
        } else if (direction === GameBoard.Direction.up) {
            btn.style.transform = "rotate(270deg)";
            trans = [-1, 0];
        } else if (direction === GameBoard.Direction.down) {
            trans = [1, 0];
            btn.style.transform = "rotate(90deg)";
        }

        // Rows : y dir and Cols : x dir
        btn.style.left = `${(coords[0][1] + coords[1][1]) / 2 * 10 + trans[1] * 5 + 3}%`;
        btn.style.top = `${(coords[0][0] + coords[1][0]) / 2 * 10 + trans[0] * 5 + 3}%`;

        if (this.isMoveAllowed(ship, trans)) {
            btn.className = "material-symbols-outlined move-btn enabled";
            btn.addEventListener('click', (e) => {
                this.moveShip(ship, trans);
                // Render callback
                this.render(parent, game);
            });
        } else {
            btn.className = "material-symbols-outlined move-btn disabled";
        }

        return btn;
    }

    render(parent, game) {
        // Remove content
        Utils.removeContent(parent);

        // Render board
        const board = document.createElement("div");
        board.className = "board";
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
                board.appendChild(cell);
            }
        }
        parent.appendChild(board);

        // Render ships control
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        for (let ship of this.ships) {
            const coords = [ship.shipCoordinates[0], ship.shipCoordinates[ship.shipCoordinates.length - 1]];
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.left, coords, parent, game, ship));
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.right, coords, parent, game, ship));
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.up, coords, parent, game, ship));
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.down, coords, parent, game, ship));
        }
        parent.appendChild(overlay);
    }
}
export default GameBoard;