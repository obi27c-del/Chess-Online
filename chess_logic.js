const { parse } = require("path");

class Piece {
    #type;
    #directions;
    #color;
    #numMoves

    constructor(color) {

        this.#color = color;
    }
    get color() {
        return this.#color;
    }
    get type() {
        return this.#type;
    }
    get directions() {
        return this.#directions;
    }

    get numMoves() {
        return this.#numMoves;
    }
    set color(val) {
        this.#color = val;
    }
    set type(val) {
        this.#type = val;
    }
    set directions(val) {
        this.#directions = val;
    }

    set numMoves(val) {
        this.#numMoves = val;
    }
}

class Pawn extends Piece {

    constructor(color) {
        super(color);
        if (this.color === 'w') {
            this.type = 'P'; // uppercase for white
        }
        else {
            this.type = 'p'; // lowercase for black
        }
        this.directions = [
            { x: 0, y: 1 } // Pawns move forward only
        ];
        this.numMoves = 0;
        if (this.color === 'w') {
            this.directions = [
                { x: 0, y: 1 },
            ];
        }
        else {
            this.directions = [
                { x: 0, y: -1 },
            ];
        }

    }
}

class Bishop extends Piece {

    constructor(color) {
        super(color);
        if (this.color === 'w') {
            this.type = 'B'; // uppercase for white
        }
        else {
            this.type = 'b'; // loweercase for black
        }
        this.directions = [
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 }];
    }
}

class Knight extends Piece {

    constructor(color) {
        super(color);
        if (this.color === 'w') {
            this.type = 'N'; // uppercase for white
        }
        else {
            this.type = 'n'; // lowercase for black
        }
        this.directions = [
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
        if (this.color === 'w') {
            this.type = 'R'; // uppercase for white
        }
        else {
            this.type = 'r'; // lowercase for black
        }
        this.directions = [
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
        if (this.color === 'w') {
            this.type = 'Q'; // uppercase for white
        }
        else {
            this.type = 'q'; // lowercase for black
        }
        this.directions = [
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
        if (this.color === 'w') {
            this.type = 'K'; // uppercase for white
        }
        else {
            this.type = 'k'; // lowercase for black
        }
        this.directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: 1 },
            { x: -1, y: -1 }
        ];
        this.numMoves = 0;

    }
}

class Chessboard {
    #chessboard;
    #playerColor;
    #drawCounter;
    #fullMoveCounter
    #lastMove;
    constructor(playerColor, botDifficulty) {
        this.#playerColor = playerColor;
        this.#drawCounter = 0;
        this.#fullMoveCounter = 1;
        this.botDifficulty = botDifficulty;
        this.#lastMove = null;
        this.#chessboard = [
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
    get drawCounter() {
        return this.#drawCounter;
    }

    get allMoves() {
        return this.getAllMoves();
    }

    set drawCounter(val) {
        this.#drawCounter = val;
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
    // ignoreKingSafety to prevent infinite recursion
    getAllMoves(ignoreKingSafety = false) {
        let allMoves = [];

        for (let y = 0; y < 8; y++) {
            let row = [];

            for (let x = 0; x < 8; x++) {
                let piece = this.#chessboard[y][x];

                if (!piece) {
                    row.push(null);
                    continue;
                }

                const moves = [];
                const t = piece.type.toLowerCase();

                // SLIDERS (rook, bishop, queen)
                if (this.isSlidingPiece(piece)) {
                    for (const dir of piece.directions) {
                        for (let step = 1; step < 8; step++) {
                            const nx = x + dir.x * step;
                            const ny = y + dir.y * step;
                            if (!this.inBounds(nx, ny)) break;

                            const target = this.#chessboard[ny][nx];
                            if (!target) {
                                moves.push([nx, ny]);
                            } else {
                                if (target.color !== piece.color)
                                    moves.push([nx, ny]);
                                break;
                            }
                        }
                    }
                }

                // PAWNS
                else if (t === 'p') {
                    const direction = piece.color === 'w' ? -1 : 1;

                    // Forward one
                    if (this.inBounds(x, y + direction) &&
                        !this.#chessboard[y + direction][x]) {
                        moves.push([x, y + direction]);

                        // Forward two
                        if (piece.numMoves === 0 &&
                            !this.#chessboard[y + direction * 2][x]) {
                            moves.push([x, y + direction * 2]);
                        }
                    }

                    // Captures + en passant
                    for (const dx of [-1, 1]) {
                        const cx = x + dx;
                        const cy = y + direction;

                        if (!this.inBounds(cx, cy)) continue;

                        const target = this.#chessboard[cy][cx];

                        if (target && target.color !== piece.color) {
                            moves.push([cx, cy]);
                        } else {
                            // en passant
                            if (this.canEnPassant(x, y, cx, cy)) {
                                moves.push([cx, cy]);
                            }
                        }
                    }
                }

                // KING
                else if (t === 'k') {
                    for (const dir of piece.directions) {
                        const nx = x + dir.x;
                        const ny = y + dir.y;

                        if (!this.inBounds(nx, ny)) continue;

                        const target = this.#chessboard[ny][nx];

                        if (!target || target.color !== piece.color) {
                            if (!ignoreKingSafety) {
                                
                                if (this.isKingMoveSafe(x, y, nx, ny, piece.color))
                                    moves.push([nx, ny]);
                            } else {
                            
                                moves.push([nx, ny]);
                            }
                        }
                    }

                    // Castling 
                    if (!ignoreKingSafety && piece.numMoves === 0) {

                        // Short castle
                        if (this.canCastle(piece.color, 'short')) {
                            if (this.isKingMoveSafe(x, y, x + 1, y, piece.color) &&
                                this.isKingMoveSafe(x, y, x + 2, y, piece.color))
                                moves.push([x + 2, y]);
                        }

                        // Long castle
                        if (this.canCastle(piece.color, 'long')) {
                            if (this.isKingMoveSafe(x, y, x - 1, y, piece.color) &&
                                this.isKingMoveSafe(x, y, x - 2, y, piece.color))
                                moves.push([x - 2, y]);
                        }
                    }
                }

                // KNIGHTS / OTHER PIECES
                else {
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

                row.push(moves);
            }

            allMoves.push(row);
        }

        return allMoves;
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
        let allMoves = this.getAllMoves(true);
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

    isKingMoveSafe(fromX, fromY, toX, toY, color) {
        const piece = this.#chessboard[fromY][fromX];
        const captured = this.#chessboard[toY][toX];

        // temporary move
        this.#chessboard[toY][toX] = piece;
        this.#chessboard[fromY][fromX] = null;


        this.getAllMoves(true);
        const inCheck = this.isinCheck(color);


        // undo
        this.#chessboard[fromY][fromX] = piece;
        this.#chessboard[toY][toX] = captured;
        this.getAllMoves(true);

        return !inCheck;
    }

    isinCheckmate(color) {
        if (!this.isinCheck(color)) {
            return false;
        }
        // generate all moves for current player and see if any resolve the check
        let allMoves = this.getAllMoves();
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
        const y = color === 'w' ? 7 : 0;

        const king = this.#chessboard[y][4];
        if (!king || king.type.toLowerCase() !== 'k' || king.numMoves > 0)
            return false;

        const rookX = side === 'short' ? 7 : 0;
        const rook = this.#chessboard[y][rookX];
        if (!rook || rook.type.toLowerCase() !== 'r' || rook.numMoves > 0)
            return false;

        // Check squares between king and rook
        if (side === 'short') {
            // squares 5 and 6
            if (this.#chessboard[y][5] || this.#chessboard[y][6])
                return false;
        } else {
            // squares 1,2,3
            if (this.#chessboard[y][1] || this.#chessboard[y][2] || this.#chessboard[y][3])
                return false;
        }

        // NO check detection here — that must be handled before calling
        return true;
    }

    canEnPassant(fromX, fromY, toX, toY) {
        const piece = this.#chessboard[fromY][fromX];
        if (!piece || piece.type.toLowerCase() !== 'p') return false;

        // Must have a recorded last move
        if (!this.#lastMove) return false;

        let ly = this.#lastMove[1];
        let ly2 = this.#lastMove[3];
        let lx = this.#lastMove[0];
        let lx2 = this.#lastMove[2];
        let pieceMoved = this.#lastMove[4];

        // Last moved piece must be a pawn
        if (pieceMoved.type.toLowerCase() !== 'p') return false;

        // It must have been a double-step move
        if (Math.abs(ly2 - ly) !== 2) return false;

        // The pawn must now be horizontally adjacent to this pawn
        if (ly2 !== fromY) return false;
        if (lx2 !== toX) return false;

        // Destination square must be directly behind the pawn
        const direction = piece.color === 'w' ? -1 : 1;
        if (toY !== fromY + direction) return false;

        return true;
    }
    makeMove(fromX, fromY, toX, toY, isMyTurn = true) {
        const piece = this.#chessboard[fromY][fromX];
        this.#lastMove = [fromX, fromY, toX, toY, piece];
        if (!isMyTurn) {
            return false; // not player's turn
        }

        if (!piece) {
            return false; // no piece at source
        }

        let allMoves = this.getAllMoves();
        let validMoves = allMoves[fromY][fromX];
        let move = [toX, toY];
        let isValid = false;
        for (let m of validMoves) {
            if (m[0] === move[0] && m[1] === move[1]) {
                isValid = true;
                break;
            }
        }
        if (!isValid) {
            return false;
        }

        // Handle special moves: castling, en passant, promotion   
        const t = piece.type.toLowerCase();
        if (t === 'k' && Math.abs(toX - fromX) === 2) {
            // Castling
            if (toX > fromX) {
                // kingside
                this.#chessboard[toY][toX - 1] = this.#chessboard[toY][7];
                this.#chessboard[toY][7] = null;
            } else {
                // queenside
                this.#chessboard[toY][toX + 1] = this.#chessboard[toY][0];
                this.#chessboard[toY][0] = null;
            }
        } else if (t === 'p' && fromX !== toX && !this.#chessboard[toY][toX]) {
            // En passant
            const direction = piece.color === 'w' ? -1 : 1;
            this.#chessboard[toY - direction][toX] = null;
        }
        let target = this.#chessboard[toY][toX];
        if (target || t === 'p') {
            this.#drawCounter = 0;
        } else {
            this.#drawCounter += 1;
        }

        this.#chessboard[toY][toX] = piece;
        this.#chessboard[fromY][fromX] = null;
        piece.numMoves += 1;
        this.#fullMoveCounter += piece.color === 'b' ? 1 : 0;
        this.getAllMoves(); // update moves after the move
        return true;
    }


    promotePawn(x, y, newType) {
        const piece = this.#chessboard[y][x];
        if (!piece || piece.type.toLowerCase() !== 'p') {
            return false; // not a pawn
        }
        if (piece.color === 'w') {
            newType = newType.toUpperCase();
        }
        else {
            newType = newType.toLowerCase();
        }
        if (newType === 'q') {
            this.#chessboard[y][x] = new Queen(piece.color);
        }
        else if (newType === 'r') {
            this.#chessboard[y][x] = new Rook(piece.color);
        }
        else if (newType === 'b') {
            this.#chessboard[y][x] = new Bishop(piece.color);
        }
        else if (newType === 'n') {
            this.#chessboard[y][x] = new Knight(piece.color);
        }
        else {
            return false; // invalid promotion type
        }
        // ... other methods like makeMove, promotePawn, findStockFishMove(difficulty)

    }

    getFENnotation() {
        // Side to move is always opponent of player color
        const botColor = this.#playerColor === 'w' ? 'b' : 'w';

        let fen = '';

        // Piece placement
        for (let y = 0; y < 8; y++) {
            let empty = 0;
            for (let x = 0; x < 8; x++) {
                const piece = this.#chessboard[y][x];
                if (!piece) {
                    empty++;
                } else {
                    if (empty > 0) {
                        fen += empty;
                        empty = 0;
                    }
                    fen += piece.type;
                }
            }
            if (empty > 0) fen += empty;
            if (y < 7) fen += '/';
        }

        // Castling rights
        let castles = '';
        if (this.canCastle('w', 'short')) castles += 'K';
        if (this.canCastle('w', 'long')) castles += 'Q';
        if (this.canCastle('b', 'short')) castles += 'k';
        if (this.canCastle('b', 'long')) castles += 'q';
        if (castles === '') castles = '-';

        // No en passant target for now — easy to add later
        fen += ` ${botColor} ${castles} - ${this.#drawCounter} ${this.#fullMoveCounter}`;

        return fen;
    }

    async makeBotMove() {
        let depth;

        if (this.botDifficulty === 'easy') {
            depth = 2;
        } else if (this.botDifficulty === 'medium') {
            depth = 5;
        } else {
            depth = 10;
        }

        const fen = this.getFENnotation();

        try {
            const response = await fetch("https://chess-api.com/v1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fen: fen,
                    depth: depth,
                    variants: 1
                })
            });

            const data = await response.json();

            if (!data.fromNumeric || !data.toNumeric) {
                console.error("Bot move missing fromNumeric/toNumeric:", data);
                return false;
            }

            // convert to integers
            const fromNum = parseInt(data.fromNumeric, 10);
            const toNum = parseInt(data.toNumeric, 10);

            // Convert 1–64 to board coordinates (0–7)
            const fromX = (fromNum - 1) % 8;
            const fromY = Math.floor((fromNum - 1) / 8);

            const toX = (toNum - 1) % 8;
            const toY = Math.floor((toNum - 1) / 8);
            // DEBUG
            console.log("Bot move:", { fromX, fromY, toX, toY });

            this.makeMove(fromX, fromY, toX, toY);
            this.getAllMoves(); // update moves after bot move
            return true;

        } catch (err) {
            console.error("Stockfish API error:", err);
            return false;
        }
    }
}




module.exports = { Chessboard, Piece, Pawn, Rook, Knight, Bishop, Queen, King }; // Makes this a module, allows server to request (I think)
module.exports = { Chessboard, Piece, Pawn, Rook, Knight, Bishop, Queen, King }; // Makes this a module, allows server to request (I think)
