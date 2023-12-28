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
    test('hitShip', () => {
        const size = 10;
        const gb = new GameBoard(size);
        const s = new Ship(3);
        gb.placeShip(s, [3, 3], [1, 0]);

        //If it should pass with deep equality, replace "toBe" with "toStrictEqual"
        expect(gb.receiveAttack([2, 2])).toBe(false);
        expect(gb.receiveAttack([3, 3])).toBe(true);
        expect(s.isSunk()).toBe(false);
        expect(gb.receiveAttack([3, 4])).toBe(true);
        expect(s.isSunk()).toBe(false);
        expect(gb.receiveAttack([3, 5])).toBe(true);
        expect(s.isSunk()).toBe(true);
    });
    test('gameOver', () => {
        const size = 10;
        const gb = new GameBoard(size);
        const s = new Ship(3);
        gb.placeShip(s, [3, 3], [1, 0]);

        expect(gb.receiveAttack([3, 3])).toBe(true);
        expect(gb.gameOver()).toBe(false);
        expect(gb.receiveAttack([3, 4])).toBe(true);
        expect(gb.gameOver()).toBe(false);
        expect(gb.receiveAttack([3, 5])).toBe(true);
        expect(gb.gameOver()).toBe(true);
    });
});