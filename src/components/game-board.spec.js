import GameBoard from './game-board';
import Ship from './ship';

describe('GameBoard', () => {
    test('size 10', () => {
        const size = 10;
        const gb = new GameBoard(size);
        //If it should pass with deep equality, replace "toBe" with "toStrictEqual"
        expect(gb.size).toStrictEqual(size);
        expect(gb.grid.length).toStrictEqual(size);
        expect(gb.grid[0].length).toStrictEqual(size);
    });
    test('placeShip', () => {
        const size = 10;
        const gb = new GameBoard(size);
        const s = new Ship(3);
        gb.placeShip(s, [3, 3], [1, 0]);

        const new_grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        //If it should pass with deep equality, replace "toBe" with "toStrictEqual"
        expect(gb.grid).toStrictEqual(new_grid);
    });
});