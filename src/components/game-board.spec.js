import GameBoard from './game-board';

describe('GameBoard', () => {
    test('size 10', () => {
        const size = 10;
        const gb = new GameBoard(size);
        //If it should pass with deep equality, replace "toBe" with "toStrictEqual"
        expect(gb.size).toStrictEqual(size);
        expect(gb.grid.length).toStrictEqual(size);
        expect(gb.grid[0].length).toStrictEqual(size);
    });
});