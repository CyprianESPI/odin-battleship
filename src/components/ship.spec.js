import Ship from './ship';

describe('Ship', () => {
    test('length 3', () => {
        const s = new Ship(3);
        //If it should pass with deep equality, replace "toBe" with "toStrictEqual"
        expect(s.isSunk()).toStrictEqual(false);
        s.hit();
        expect(s.isSunk()).toStrictEqual(false);
        s.hit();
        expect(s.isSunk()).toStrictEqual(false);
        s.hit();
        expect(s.isSunk()).toStrictEqual(true);
    });
});