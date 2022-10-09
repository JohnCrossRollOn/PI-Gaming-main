const { Router } = require('express');
const videogames = require('./videogames.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// axios.get(`https://api.rawg.io/api/games?key=${KEY}`)

const router = Router();
router.use('/videogames', videogames)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
