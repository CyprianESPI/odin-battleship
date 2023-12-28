class GameBoard {
    static CellStatus = {
        "empty": 0,
        "water-hit": 1,
        "ship-hit": 2,
    };

    constructor(size) {
        this.ships = [];
        this.size = size;
        this.grid = [];
        for (let row = 0; row < size; row++) {
            const row = [];
            for (let col = 0; col < size; col++) {
                row.push(GameBoard.CellStatus["empty"]);
            }
            this.grid.push(row);
        }
    }
}
export default GameBoard;