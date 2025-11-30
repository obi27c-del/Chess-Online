class Piece {
    _type;
    _directions;
    _color;
    _numMoves

    constructor(color) {

        this._color = color;
    }
    get color() {
        return this._color;
    }
    get type() {
        return this._type;
    }
    get directions() {
        return this._directions;
    }

    get numMoves() {
        return this._numMoves;
    }

    set numMoves(val) {
        this._numMoves = val;
    }
}

class Pawn extends Piece {

    constructor(color) {
        super(color);
        if (this._color === 'w') {
            this._type = 'P'; // uppercase for white
        }
        else {
            this._type = 'p'; // lowercase for black
        }
        this._directions = [
            { x: 0, y: 1 } // Pawns move forward only
        ];
        this._numMoves = 0;
        if (this._color === 'w') {
            this._directions = [
                { x: 0, y: 1 },
            ];
        }
        else {
            this._directions = [
                { x: 0, y: -1 },
            ];
        }

    }
}
class Bishop extends Piece {

    constructor(color) {
        super(color);
        if (this._color === 'w') {
            this._type = 'B'; // uppercase for white
        }
        else {
            this._type = 'b'; // loweercase for black
        }
        this._directions = [
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 }];
    }
}

class Knight extends Piece {

    constructor(color) {
        super(color);
        if (this._color === 'w') {
            this._type = 'N'; // uppercase for white
        }
        else {
            this._type = 'n'; // lowercase for black
        }
        this._directions = [
            { x: 2, y: 1 },
            { x: 2, y: -1 },
            { x: -2, y: 1 },
            { x: -2, y: -1 },
            { x: 1, y: 2 },
            { x: 1, y: -2 },
            { x: -1, y: 2 },
            { x: -1, y: -2 }
        ];
    }
}

class Rook extends Piece {

    constructor(color) {
        super(color);
        if (this._color === 'w') {
            this._type = 'R'; // uppercase for white
        }
        else {
            this._type = 'r'; // lowercase for black
        }
        this._directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];
    }
}

class Queen extends Piece {
    constructor(color) {
        super(color);
        if (this._color === 'w') {
            this._type = 'Q'; // uppercase for white
        }
        else {
            this._type = 'q'; // lowercase for black
        }
        this._directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 }
        ];
    }
}
class King extends Piece {
    constructor(color) {
        super(color);
        if (this._color === 'w') {
            this._type = 'K'; // uppercase for white
        }
        else {
            this._type = 'k'; // lowercase for black
        }
        this._directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 }
        ];
        this._numMoves = 0;

        let castled = false; // should be good enough for now?

    }
}

class Chessboard {
    #chessboard;
    #playerColor;
    constructor(playerColor) {
        this.#playerColor = playerColor;

        this.#chessboard = [ // LOL theres definitely a better way to do this but it works for now
            [new Rook('b'), new Knight('b'), new Bishop('b'), new Queen('b'), new King('b'), new Bishop('b'), new Knight('b'), new Rook('b')],
            [new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b'), new Pawn('b')],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w'), new Pawn('w')],
            [new Rook('w'), new Knight('w'), new Bishop('w'), new Queen('w'), new King('w'), new Bishop('w'), new Knight('w'), new Rook('w')]
        ];
    }

    getCurrentBoard() {
        // return a new 2D array containing the piece.type for each square or null if empty
        return this.#chessboard.map(row => row.map(cell => (cell ? cell.type : null)));
    }

    getFlippedBoard() {
        // return a new 2D array containing the piece.type for each square or null if empty, flipped for black perspective
        return this.#chessboard
            .slice()
            .reverse()
            .map(row => row.slice().reverse().map(cell => (cell ? cell.type : null)));
    }
    // NOW we gotta make html that takes the current board, swaps the letters for images, and displays it nicely
    getPlayerColor() {
        return this.#playerColor;
    }

    // gotta make the function "isincheck" https://youtu.be/fJIsqZmQVZQ?t=1693 literally does it for us (link is timestamped)

}
