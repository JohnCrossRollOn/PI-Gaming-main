const { Router } = require('express');
const { getGames, getGame, postGame } = require('../controllers/videogamesController.js');

const videogames = Router();

videogames.get('/:id', getGame);
videogames.get('/', getGames);

videogames.post('/create', postGame)

module.exports = videogames;