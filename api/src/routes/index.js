const { Router } = require('express');
const videogames = require('./videogamesRoute');
const genres = require('./genresRoute');
const platforms = require('./platformsRoute')
// Importar todos los routers;


const router = Router();
router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/platforms', platforms)
// Configurar los routers

module.exports = router;
