import GameBoard from "./game-board";
import Utils from "./utils";
import close from "../assets/close_FILL0_wght400_GRAD0_opsz24.svg";
import radio_button_checked from "../assets/radio_button_checked_FILL0_wght400_GRAD0_opsz24.svg";
import radio_button_unchecked from "../assets/radio_button_unchecked_FILL0_wght400_GRAD0_opsz24.svg";

class GameBoardUi extends GameBoard {
    constructor(container, size) {
        super(size);
        this.container = container;
    }

    createMoveButton(direction, coords, parent, game, ship) {
        const btn = document.createElement("button");
        btn.innerText = "chevron_right";
        let trans = [0, 0];
        if (direction === GameBoard.Direction.right) {
            // Rotate goes clockwise
            btn.style.transform = "rotate(0deg)";
            trans = [0, 1];
        } else if (direction === GameBoard.Direction.left) {
            btn.style.transform = "rotate(180deg)";
            trans = [0, -1];
        } else if (direction === GameBoard.Direction.up) {
            btn.style.transform = "rotate(270deg)";
            trans = [-1, 0];
        } else if (direction === GameBoard.Direction.down) {
            trans = [1, 0];
            btn.style.transform = "rotate(90deg)";
        }

        // Rows : y dir and Cols : x dir
        btn.style.left = `${(coords[0][1] + coords[1][1]) / 2 * 10 + trans[1] * 10 + 5}%`;
        btn.style.top = `${(coords[0][0] + coords[1][0]) / 2 * 10 + trans[0] * 10 + 5}%`;

        if (this.isMoveAllowed(ship, trans)) {
            btn.className = "material-symbols-outlined move-btn enabled";
            btn.addEventListener('click', (e) => {
                this.moveShip(ship, trans);
                // Render callback
                this.render(parent, game);
            });
        } else {
            btn.className = "material-symbols-outlined move-btn hidden";
        }

        return btn;
    }

    render(game) {
        // Remove content
        const parent = this.container;
        Utils.removeContent(parent);

        // Render board
        const board = document.createElement("div");
        board.className = "board";
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement("div");
                const dot = document.createElement("div");
                dot.className = "dot";
                if (this.grid[row][col] === GameBoard.CellStatus.water) {
                    cell.className = "cell water";
                    // Can shoot at
                    if (this.enabled) {
                        cell.className += " clickable";
                        cell.addEventListener('click', (e) => {
                            console.log(`Firing at ${row}, ${col}`);
                            game.play([row, col]);
                        });
                    }
                } else if (this.grid[row][col] === GameBoard.CellStatus.waterHit) {
                    cell.className = "cell water miss";
                    dot.style.backgroundImage = `url('${close}')`;
                    cell.appendChild(dot);
                } else if (this.grid[row][col] === GameBoard.CellStatus.ship) {
                    cell.className = "cell ship";
                    // Can shoot at
                    if (this.enabled) {
                        cell.className += " clickable";
                        cell.addEventListener('click', (e) => {
                            console.log(`Firing at ${row}, ${col}`);
                            game.play([row, col]);
                        });
                    }
                } else if (this.grid[row][col] === GameBoard.CellStatus.shipHit) {
                    cell.className = "cell ship hit";
                    dot.style.backgroundImage = `url('${radio_button_checked}')`;
                    cell.appendChild(dot);
                } else if (this.grid[row][col] === GameBoard.CellStatus.waterEmpty) {
                    cell.className = "cell water empty";
                    dot.style.backgroundImage = `url('${radio_button_unchecked}')`;
                    cell.appendChild(dot);
                }
                board.appendChild(cell);
            }
        }
        parent.appendChild(board);

        // Render ships control
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        for (let ship of this.ships) {
            const coords = [ship.shipCoordinates[0], ship.shipCoordinates[ship.shipCoordinates.length - 1]];

            const shipOverlay = document.createElement("div");
            shipOverlay.className = "ship-overlay";
            shipOverlay.className += ship.isSunk() ? " sunk" : "";
            shipOverlay.className += ship.isDamaged() ? " damaged" : "";
            const offset = 2;
            shipOverlay.style.left = `${(coords[0][1]) * 10 + offset}%`;
            shipOverlay.style.top = `${(coords[0][0]) * 10 + offset}%`;
            shipOverlay.style.height = `${Math.abs(coords[1][0] - coords[0][0] + 1) * 10 - 2 * offset}%`;
            shipOverlay.style.width = `${Math.abs(coords[1][1] - coords[0][1] + 1) * 10 - 2 * offset}%`;
            overlay.appendChild(shipOverlay);

            overlay.appendChild(this.createMoveButton(GameBoard.Direction.left, coords, parent, game, ship));
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.right, coords, parent, game, ship));
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.up, coords, parent, game, ship));
            overlay.appendChild(this.createMoveButton(GameBoard.Direction.down, coords, parent, game, ship));
        }
        parent.appendChild(overlay);
    }
}
export default GameBoardUi;