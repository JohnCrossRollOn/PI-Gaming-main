const { Router } = require('express');
const { getGames, getGameDetail, postGames } = require('../controllers/videogame.js');

const videogames = Router();

videogames.get('/:id', getGameDetail);
videogames.get('/', getGames);

videogames.post('/', postGames)


module.exports = videogames;