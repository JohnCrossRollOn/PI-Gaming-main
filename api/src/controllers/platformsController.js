const { Videogame , Platform } = require('../db.js');

const getPlatforms = async (req, res)=>{
    try {
        const platforms = await Platform.findAll({
            include: {
                model: Videogame, 
                attributes: ['name', 'id']
            }, 
            attributes: ['name', 'id']
        });
        res.json(platforms); 
    } catch (e) {
        res.status(400).send(e.message)
    }
};

module.exports = { getPlatforms }