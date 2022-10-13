const { Videogame , Genre, Videogenre } = require('../db.js');
const { Op } = require('sequelize');

const getGames = async (req, res) => {
    try {
        const {name} = req.query;
        const where = name?{name: {[Op.iLike]: `%${name}%`}}:null;
        let games = await Videogame.findAll({
            where,
            include: {
                model: Genre, 
                attributes: ['name', 'id']
            }, 
            attributes: ['name', 'thumbnail', 'id', 'source', 'rating']
        });
        res.json(games);
    } catch(e) {
        res.status(400).send(e.message)
    }
}

const getGameDetail = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) throw new Error('Cannot search inexistent ID')
        const game = await Videogame.findByPk(id, {
            attributes: {exclude: ['id']},
            include: {
                model: Genre
            }
        })
        res.json(game)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const postGames = async (req, res) => {
    try {
        let {name, description, launch_date, rating, platforms, genres, thumbnail} = req.body;
        const date = new Date();
        launch_date ||= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        rating ||= 5;
        thumbnail ||= 'stockImage';

        const game = await Videogame.create({
            name,
            description,
            launch_date,
            rating,
            platforms,
            thumbnail
        });

        game.addGenres(genres, {through: Videogenre});
        res.json(game);
    } catch (e) {
        res.status(400).send(e.message)
    }
};

module.exports = {getGames, getGameDetail, postGames}