const { Videogame , Genre } = require('../db.js');

const getGenres = async (req, res)=>{
    try {
        const genres = await Genre.findAll({
            include: {
                model: Videogame, 
                attributes: ['name', 'id']
            }, 
            attributes: ['name', 'id']
        });
        res.json(genres); 
    } catch (e) {
        console.log(`There was a mistake with: ${e.message}`)
        res.status(400).send(e.message)
    }
};

module.exports = { getGenres }