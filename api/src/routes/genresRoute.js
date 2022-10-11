const { Router } = require('express');
const { getGenres } = require('../controllers/genresController');

const genres = Router();

genres.get('/', getGenres);

module.exports = genres;
