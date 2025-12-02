import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // I didn't want to change my variable name (__dirname), meant I had to do this extra bit to make it one because ESM doesn't have the same way of being.
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4242;

import { Chessboard } from "./chess_logic.js";

//Create a chessboard instance. for now, one per server, we would have to do per player at somepoint
const chess = new Chessboard('w');

//Route for the intro page
app.get('/chess', (req, res) => {
    res.sendFile(path.join(__dirname, 'chessintro.html'));
});

//Get game page
app.get('/chess/game', (req, res) => {
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
