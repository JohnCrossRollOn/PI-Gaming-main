const { Router } = require('express');
const { getPlatforms } = require('../controllers/platformsController');

const platforms = Router();

platforms.get('/', getPlatforms);

module.exports = platforms;
