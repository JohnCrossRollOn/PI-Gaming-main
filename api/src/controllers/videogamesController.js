const { Videogame , Genre, Videogenre } = require('../db.js');
const { Op } = require('sequelize');
const { getApiGames, searchApiGames, getApiGame } = require('../Api.js');

const getGames = async (req, res, next) => {
    try {
        const {name} = req.query;
        const where = name?{name: {[Op.iLike]: `%${name}%`}}:null;
        let dbGames = await Videogame.findAll({
            where,
            include: {
                model: Genre, 
                attributes: ['name']
            }, 
            attributes: ['name', 'thumbnail', 'id', 'source', 'rating'],
            limit: name?15:null
        });

        const apiGames = name?await searchApiGames(name):await getApiGames();

        res.json([...dbGames, ...apiGames]);
    } catch(e) {
        next(e)
    }
}

const getGame = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!id) throw new Error('Cannot search inexistent ID')

        const dbGame = await Videogame.findByPk(id, {
            attributes: {exclude: ['id']},
            include: {
                model: Genre
            }
        });
        if (dbGame) {
            res.json(dbGame)
        } else {
            console.log(dbGame)
            const apiGame = await getApiGame(id);
            res.json(apiGame)
        }
        
    } catch (e) {
        next(e)
    }
}

const postGames = async (req, res, next) => {
    try {
        let {name, description, launch_date, rating, platforms, genres, thumbnail} = req.body;
        const date = new Date();
        launch_date ||= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        rating ||= 5;
        thumbnail ||= 'The author didn\'provide an image';

        const game = await Videogame.create({
            name,
            description,
            launch_date,
            rating,
            platforms,
            thumbnail
        });

        const idGenres = await Genre.findAll({
            where: {name: {[Op.iLike]: { [Op.any]: genres}}},
            attributes: ['id']
        });
        
        await game.addGenres(idGenres.map(genre=>genre.dataValues.id), {through: Videogenre});

        const createdGame = await Videogame.findByPk(game.id, {include: Genre});
        res.json(createdGame);
    } catch (e) {
        next(e)
    }
};

module.exports = {getGames, getGame, postGames}