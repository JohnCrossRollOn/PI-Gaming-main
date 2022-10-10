const { Api } = require('../api.js');
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
                attributes: ['name']
            }, 
            attributes: ['name', 'thumbnail', 'id']
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
        const game = await Videogame.findOne({
            where: {id},
            attributes: {exclude: ['id']}
        })
        res.json(game)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const getGenres = async (req, res) => {
    const apiGenres = (await Api.get('/genres')).data.results
    .map(({id, name})=>{return {id, name}});
    res.json(apiGenres)
}

const postGames = async (req, res) => {
    try {
        let {name, description, launch_date, rating, platforms, genres, thumbnail} = req.body;
        launch_date ||= Date.now;
        rating ||= 5;
        req.body.thumbnail ||= 'stockImage';
        console.log(thumbnail)
        const game = await Videogame.create(req.body)
        res.json(req.body)
    } catch (e) {
        res.status(400).send(e.message)
    }
};

const postBulkGames = async (req, res) => {
    try {

        const apiGames = (await Api.get('/games')).data.results;
        for (let apiGame of apiGames) {
            const {id, name, genres, released, rating, parent_platforms, background_image} = apiGame;
            const game = {
                id: id,
                name: name,
                description: name,
                launch_date: released,
                rating: rating,
                platforms: parent_platforms.map(platform=>platform.platform.name),
                thumbnail: background_image,
            };
            const dbGame = await Videogame.create(game);
            genres.map(({id})=>parseInt(id)).
            forEach(async id=>{
                const gameGenreRow = await Genre.findByPk(id);
                // console.log(gameGenreRow)
                await dbGame.addGenre(gameGenreRow, {through: Videogenre})
            })
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
}


module.exports = {getGames, getGameDetail, getGenres, postGames}