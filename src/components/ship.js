class Ship {
    constructor(length, name) {
        this.length = length;
        this.name = name === undefined ? "undefined" : name;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }

    isDamaged() {
        return this.hits > 0;
    }
}
export default Ship;