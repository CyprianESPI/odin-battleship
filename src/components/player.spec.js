import GameBoard from './game-board';
import Player from './player';
import Ship from './ship';

describe('Player', () => {
    test('placeShip', () => {
        const player = new Player();
        const ship = player.ships.find(s => s.name == "submarine");
        player.board.placeShip(ship, [3, 3], [1, 0]);

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
        expect(player.board.grid).toStrictEqual(new_grid);
    });
});