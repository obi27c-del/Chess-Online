// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 4242;

// Route for the intro page
app.get('/chess', (req, res) => {
    res.sendFile(path.join(__dirname, 'chessintro.html'));
});

// Route for the game page
app.get('/chess/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'chessgame.html'));
});

// Start the server.
// This is the only tested part, this DOES run server.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
