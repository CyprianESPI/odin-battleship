class GameBoard {
    static CellStatus = {
        "water": 0,
        "water-hit": 1,
        "ship": 2,
        "ship-hit": 3,
    };

    constructor(size) {
        this.ships = [];
        this.size = size;
        this.grid = [];
        for (let row = 0; row < size; row++) {
            const row = [];
            for (let col = 0; col < size; col++) {
                row.push(GameBoard.CellStatus.water);
            }
            this.grid.push(row);
        }
    }

    // position/direction format: [x, y] <-> [col, row]
    // position is the edge of ship
    placeShip(ship, position, direction) {
        const shipCoordinates = [];
        for (let i = 0; i < ship.length; i++) {
            // Row and cols are confusing... be careful with index
            const row = position[1] + i * direction[1];
            const col = position[0] + i * direction[0];
            this.grid[row][col] = GameBoard.CellStatus.ship;
            shipCoordinates.push([row, col]);
        }
        // Add the ship coordinates property
        ship.shipCoordinates = shipCoordinates;
        this.ships.push(ship);
    }
}
export default GameBoard;