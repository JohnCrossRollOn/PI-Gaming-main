const { Router } = require('express');
const videogames = require('./videogamesRoute.js');
const genres = require('./genresRoute.js');
// Importar todos los routers;


const router = Router();
router.use('/videogames', videogames);
router.use('/genres', genres);
// Configurar los routers


module.exports = router;
