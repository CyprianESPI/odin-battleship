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
    test('play', () => {
        // Player
        const player = new Player("John");
        const player_ship = player.ships.find(s => s.name == "submarine");
        player.board.placeShip(player_ship, [3, 3], [1, 0]);
        const player_new_grid = [
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
        expect(player.board.grid).toStrictEqual(player_new_grid);

        const computer = new Player("Doe");
        const computer_ship = computer.ships.find(s => s.name == "destroyer");
        computer.board.placeShip(computer_ship, [5, 5], [1, 0]);
        const computer_new_grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        //If it should pass with deep equality, replace "toBe" with "toStrictEqual"
        expect(computer.board.grid).toStrictEqual(computer_new_grid);

        expect(player.play(computer, [3, 3])).toBe(false);
        expect(computer.board.gameOver()).toBe(false);
        expect(player.play(computer, [5, 5])).toBe(true);
        expect(player.play(computer, [5, 6])).toBe(true);
        expect(player.play(computer, [5, 7])).toBe(true);
        expect(computer.board.gameOver()).toBe(true);
    });
});