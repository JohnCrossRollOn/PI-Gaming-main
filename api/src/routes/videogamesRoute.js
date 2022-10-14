const { Router } = require('express');
const { getGames, getGame, postGames } = require('../controllers/videogamesController.js');

const videogames = Router();

videogames.get('/:id', getGame);
videogames.get('/', getGames);

videogames.post('/', postGames)

module.exports = videogames;