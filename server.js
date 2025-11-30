// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 4242;

const { Chessboard } = require('./chesslogic');

// Create a chessboard instance. for now, one per server, we would have to do per player at somepoint
const chess = new Chessboard('w');

// Route for the intro page
app.get('/chess', (req, res) => {
    res.sendFile(path.join(__dirname, 'chessintro.html'));
});

// Route for the game page
app.get('/chess/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'chessgame.html'));
});

// Send board state as JSON
app.get('/chess/game/state', (req, res) => {
    res.json({
        board: chess.getCurrentBoard(),
        playerColor: chess.getPlayerColor()
    });
});

// Start the server.
// This is the only tested part, this DOES run server.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
