import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let chess

const app = express();
const PORT = 4242;

import { Chessboard } from "./chess_logic.js";

app.use(express.static("public")); //magic for images

//Route for the intro page
app.get('/chess', (req, res) => {
    res.sendFile(path.join(__dirname, 'chessintro.html'));
});

//Get game page
app.get('/chess/game', (req, res) => {
    let difficulty = req.query.difficulty
    let color = req.query.color
    chess = new Chessboard(color, difficulty)

    res.sendFile(path.join(__dirname, 'chessgame.html'));
});

// Send board state as JSON (I think, also should be added to based on info needed)
app.get('/chess/game/state', (req, res) => {
    res.json({
        board: chess.getCurrentBoard(),
        playerColor: chess.getPlayerColor()
    });
});



//Start the server.
//This is the only tested part, this DOES run server. I PROMISE THIS TIME.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

