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

    // position/direction format: [x, y]
    // position is the edge of ship
    placeShip(ship, position, direction) {
        this.ships.push(ship);
        for (let i = 0; i < ship.length; i++) {
            const pos_x = position[0] + i * direction[0];
            const pos_y = position[1] + i * direction[1];
            // pos_y and pos_x are swapped row and cols are confusing...
            this.grid[pos_y][pos_x] = GameBoard.CellStatus.ship;
        }
    }
}
export default GameBoard;