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

    }
}

class Chessboard {
    #chessboard;
    #playerColor;
    #allMoves;
    constructor(playerColor) {
        this.#playerColor = playerColor;
        this.#allMoves = null;
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
        // return a new 2D array containing the piece.type for each square or null if empty for UI generation
        return this.#chessboard.map(row => row.map(cell => (cell ? cell.type : null)));
    }

    getFlippedBoard() {
        // return a new 2D array containing the piece.type for each square or null if empty for UI generation, flipped for black perspective
        return this.#chessboard
            .slice()
            .reverse()
            .map(row => row.slice().reverse().map(cell => (cell ? cell.type : null)));
    }
    // NOW we gotta make html that takes the current board, swaps the letters for images, and displays it nicely
    getPlayerColor() {
        return this.#playerColor;
    }


    inBounds(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
    isSlidingPiece(piece) {
        if (!piece || !piece.type) return false;
        const t = piece.type.toLowerCase();
        return t === 'r' || t === 'b' || t === 'q';
    }

    // produce all moves for every tile:
    // - returns an 8x8 array; each cell is either null (empty tile) or an array of [x,y] destination pairs
    // - sliding pieces (rook, bishop, queen) continue in a direction until blocked
    // - non-sliding pieces add single-step destinations from their directions
    getAllMoves() {
        const allMoves = [];

        for (let y = 0; y < 8; y++) {
            const rowMoves = [];
            for (let x = 0; x < 8; x++) {
                const piece = this.#chessboard[y][x];

                if (!piece) {
                    rowMoves.push(null);
                    continue;
                }

                const moves = [];

                // Sliding pieces (rook, bishop, queen)
                if (this.isSlidingPiece(piece)) {
                    for (const dir of piece.directions) {
                        for (let step = 1; step < 8; step++) {
                            const nx = x + dir.x * step;
                            const ny = y + dir.y * step;

                            if (!this.inBounds(nx, ny)) break;

                            const target = this.#chessboard[ny][nx];
                            if (!target) {
                                moves.push([nx, ny]);
                                continue;
                            } else {
                                if (target.color !== piece.color) {
                                    moves.push([nx, ny]);
                                }
                                break;
                            }
                        }
                    }

                } else {
                    // Non-sliding: handle pawns, kings, knights (and any others)
                    const t = piece.type.toLowerCase();

                    if (t === 'p') {
                        // Pawn handling: forward single, optional double on first move, diagonal captures, en passant
                        const dir = piece.color === 'w' ? -1 : 1;

                        // forward one
                        const fx = x;
                        const fy = y + dir;
                        if (this.inBounds(fx, fy) && !this.#chessboard[fy][fx]) {
                            moves.push([fx, fy]);

                            // forward two on first move
                            const fy2 = y + dir * 2;
                            if (piece.numMoves === 0 && this.inBounds(fx, fy2) && !this.#chessboard[fy2][fx]) {
                                moves.push([fx, fy2]);
                            }
                        }

                        // captures / en passant
                        for (const dx of [-1, 1]) {
                            const cx = x + dx;
                            const cy = y + dir;
                            if (!this.inBounds(cx, cy)) continue;

                            const target = this.#chessboard[cy][cx];
                            if (target && target.color !== piece.color) {
                                // normal capture
                                moves.push([cx, cy]);
                            } else {
                                // empty square: maybe en passant
                                if (this.canEnPassant(x, y, cx, cy)) {
                                    moves.push([cx, cy]);
                                }
                            }
                        }

                    } else if (t === 'k') {
                        // King: single-step moves + castling if available
                        for (const dir of piece.directions) {
                            const nx = x + dir.x;
                            const ny = y + dir.y;
                            if (!this.inBounds(nx, ny)) continue;
                            const target = this.#chessboard[ny][nx];
                            if (!target || target.color !== piece.color) {
                                moves.push([nx, ny]);
                            }
                        }

                        // Castling: if canCastle(...) returns true, add king destination square
                        if (piece.numMoves === 0) {
                            if (this.canCastle(piece.color, 'short')) {
                                // kingside: king moves two to the right
                                moves.push([x + 2, y]);
                            }
                            if (this.canCastle(piece.color, 'long')) {
                                // queenside: king moves two to the left
                                moves.push([x - 2, y]);
                            }
                        }

                    } else {
                        // other non-sliding pieces (knight etc.) use single-step directions
                        for (const dir of piece.directions) {
                            const nx = x + dir.x;
                            const ny = y + dir.y;

                            if (!this.inBounds(nx, ny)) continue;

                            const target = this.#chessboard[ny][nx];
                            if (!target || target.color !== piece.color) {
                                moves.push([nx, ny]);
                            }
                        }
                    }
                }

                rowMoves.push(moves);
            }
            allMoves.push(rowMoves);
        }
        this.#allMoves = allMoves;
        // return allMoves; idk if ill need this later
    }
    isinCheck(color) {
        // find king position
        let kingPos = null;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const piece = this.#chessboard[y][x];
                if (piece && piece.type.toLowerCase() === 'k' && piece.color === color) {
                    kingPos = [x, y];
                    break;
                }
            }
            if (kingPos) break;
        }

        // check all opponent moves to see if any can capture the king
        let opponentColor;
        if (color === 'w') {
            opponentColor = 'b';
        } else {
            opponentColor = 'w';
        }
        let allMoves = this.#allMoves;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let piece = this.#chessboard[y][x];
                if (piece && piece.color === opponentColor) {
                    let moves = allMoves[y][x];
                    if (moves) {
                        for (let move of moves) {
                            if (move[0] === kingPos[0] && move[1] === kingPos[1]) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    isinCheckmate(color) {
        if (!this.isinCheck(color)) {
            return false;
        }
        // generate all moves for current player and see if any resolve the check
        let allMoves = this.#allMoves
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let piece = this.#chessboard[y][x];
                if (piece && piece.color === color) {
                    let moves = allMoves[y][x];
                    if (moves) {
                        for (let move of moves) {
                            // make the move temporarily
                            const targetPiece = this.#chessboard[move[1]][move[0]];
                            this.#chessboard[move[1]][move[0]] = piece;
                            this.#chessboard[y][x] = null;

                            if (!this.isinCheck(color)) {
                                this.#chessboard[y][x] = piece;
                                this.#chessboard[move[1]][move[0]] = targetPiece;
                                return false; // found a move that resolves check
                            }

                            // undo the move
                            this.#chessboard[y][x] = piece;
                            this.#chessboard[move[1]][move[0]] = targetPiece;


                        }
                    }
                }
            }
        }
        return true; // no moves resolve check
    }
    canCastle(color, side) {
        let y = color === 'w' ? 7 : 0;
        let king = this.#chessboard[y][4];
        if (king.numMoves > 0) {
            return false; // king has moved
        }

        let rook;
        if (side === 'short') {
            rook = this.#chessboard[y][7];
        } else {
            rook = this.#chessboard[y][0];
        }
        if (!rook || rook.type.toLowerCase() !== 'r' || rook.numMoves > 0) {
            return false; // rook has moved
        }

        // check if all squares between king and rook are empty
        let step = side === 'short' ? -1 : 1;
        for (let x = 5 * step; x !== 0; x += step) {
            if (this.#chessboard[y][x]) {
                return false; // square is not empty
            }
        }

        return true; // can castle
    }

    canEnPassant(fromX, fromY, toX, toY) {
        const piece = this.#chessboard[fromY][fromX];
        if (!piece || piece.type.toLowerCase() !== 'p') {
            return false; // not a pawn
        }

        const direction = piece.color === 'w' ? -1 : 1;
        if (toY !== fromY + direction || Math.abs(toX - fromX) !== 1) {
            return false; // not a valid en passant move
        }


        const targetPawn = this.#chessboard[fromY][toX];
        if (!targetPawn || targetPawn.type.toLowerCase() !== 'p' || targetPawn.color === piece.color) {
            return false; // no opponent pawn to capture
        }

        if (targetPawn.numMoves !== 1) {
            return false; // target pawn has not just moved
        }

        return true; // can perform en passant
    }

    // ... other methods like makeMove, promotePawn, findStockFishMove(difficulty)



}
export { Chessboard, Piece, Pawn, Rook, Knight, Bishop, Queen, King }; // ESM version
