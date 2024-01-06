import Player from "./player";

class Game {
    constructor(humanBoard, computerBoard) {
        this.humanBoard = humanBoard;
        this.computerBoard = computerBoard;
    }

    newGame(userName, userWins, oponentName, oponentWins) {
        this.human = new Player(userName, userWins);
        this.computer = new Player(oponentName, oponentWins);
        this.players = [this.human, this.computer];
        for (let p of this.players) {
            p.shuffleShips();
        }
        // Only allow to click on computer's board
        this.computer.board.setEnabled(true);
        this.render();
        // TODO: add multi
        //this.newMutiplayerGameOnline();
    }

    newMultiplayerGame(p1Name, p1Wins, p2Name, p2Wins) {
        this.isMultiplayer = true;
        this.p1 = new Player(p1Name, p1Wins);
        this.p2 = new Player(p2Name, p2Wins);
        this.players = [this.p1, this.p2];
        this.currentPlayer = this.p1;
        for (let p of this.players) {
            p.shuffleShips();
        }
        // Only allow to click on computer's board
        this.p2.board.setEnabled(true);
        this.render();
    }

    // Mutiplayer chat-gpt powered :)
    newMutiplayerGameOnline() {
        const p1 = this.human;
        const p2 = this.computer;
        // Set up event handlers for ICE candidates and data channel
        p1.peerConnection.onicecandidate = event => {
            if (event.candidate) {
                p2.peerConnection.addIceCandidate(event.candidate);
            }
        };
        p2.peerConnection.onicecandidate = event => {
            if (event.candidate) {
                p1.peerConnection.addIceCandidate(event.candidate);
            }
        };
        // Create data channel
        const dataChannel = p1.peerConnection.createDataChannel('dataChannel');
        dataChannel.onopen = () => {
            console.log('Data channel opened!');
            dataChannel.send('Hello from human!');
        };

        dataChannel.onmessage = event => {
            console.log('Received message:', event.data);
        };

        p2.peerConnection.ondatachannel = event => {
            event.channel.onmessage = event => {
                console.log(event);
                console.log('Received message:', event.data);
            };

            event.channel.onopen = () => {
                console.log(event);
                console.log('Data channel opened!');
                event.channel.send('Hello from computer!');
            };
        };

        // Establish connection
        p1.peerConnection.createOffer()
            .then(offer => p1.peerConnection.setLocalDescription(offer))
            .then(() => p2.peerConnection.setRemoteDescription(p1.peerConnection.localDescription))
            .then(() => p2.peerConnection.createAnswer())
            .then(answer => p2.peerConnection.setLocalDescription(answer))
            .then(() => p1.peerConnection.setRemoteDescription(p2.peerConnection.localDescription))
            .catch(error => console.error('Error establishing connection:', error));
    }

    computerPlay() {
        this.humanBoard.classList.add('disabled');
        this.computerBoard.classList.add('disabled');
        const delayMs = 500;
        setTimeout(() => {
            const hit = this.computer.playRandom(this.human);
            console.log("setTimeout", hit);
            if (hit) {
                navigator.vibrate(200);
                this.humanBoard.classList.add('shake');
                setTimeout(() => {
                    this.humanBoard.classList.remove('shake')
                }, 200);
                this.checkGameOver();
                // Recursive call
                this.computerPlay();
            } else {
                this.humanBoard.classList.remove('disabled');
                this.computerBoard.classList.remove('disabled');
                this.humanBoard.classList.remove('shake');
            }
            this.render();
        }, delayMs);
    }

    play(coordinates) {
        // Multiplayer game
        if (this.isMultiplayer) {
            const oponent = this.currentPlayer === this.p1 ? this.p2 : this.p1;
            const oponentBoard = this.currentPlayer === this.p1 ? this.computerBoard : this.humanBoard;
            const hit = this.currentPlayer.play(oponent, coordinates);
            this.render();
            if (hit) {
                navigator.vibrate(200);
                oponentBoard.classList.add('shake');
                setTimeout(() => {
                    oponentBoard.classList.remove('shake');
                }, 200);
                this.checkGameOver();
            } else {
                // show dialog to switch sides

                // switch sides on close
            }
            return;
        }

        // Solo game
        // When the human plays, the computer plays right after
        const hit = this.human.play(this.computer, coordinates);
        this.render();
        // If human hit, do not let the computer play
        if (!hit) {
            this.computerPlay();
        } else {
            navigator.vibrate(200);
            this.computerBoard.classList.add('shake');
            setTimeout(() => {
                this.computerBoard.classList.remove('shake');
            }, 200);
            this.checkGameOver();
        }
    }

    checkGameOver() {
        const dialog = document.getElementById("dialog-game-over");
        // Update dialog content
        if (this.computer.board.gameOver()) {
            document.getElementById("game-over-result").innerText = "You win!";
        } else if (this.human.board.gameOver()) {
            document.getElementById("game-over-result").innerText = "You lose...";
        } else {
            return;
        }
        document.getElementById("game-over-name-cpu").innerText = this.computer.name;
        document.getElementById("game-over-name-you").innerText = this.human.name;
        document.getElementById("game-over-score-cpu").innerText = this.computer.wins;
        document.getElementById("game-over-score-you").innerText = this.human.wins;
        dialog.showModal();
    }

    render() {
        this.human.board.render(this.humanBoard, this);
        this.computer.board.render(this.computerBoard, this);
    }
}
export default Game;