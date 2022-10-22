const { Videogame , Genre, Platform, Videogenre, Videoplatform } = require('../db.js');
const { Op } = require('sequelize');
const { getApiGames, searchApiGames, getApiGame } = require('../Api.js');

const toCard = ({id, name, rating, thumbnail, source, genres})=>{
    return {
        id,
        name,
        rating,
        thumbnail,
        source,
        genres: genres.map(genre=>genre.name)
    };
};

const getGames = async (req, res, next) => {
    try {
        const {name} = req.query;
        const where = name?{name: {[Op.iLike]: `%${name}%`}}:null;
        let dbGames =  await Videogame.findAll({
            where,
            include: {
                model: Genre, 
                attributes: ['name']
            }, 
            attributes: ['name', 'thumbnail', 'id', 'source', 'rating'],
            limit: name?15:null
        });
        const getManyApiGames = async()=>{
            return [...await getApiGames(),...await getApiGames(2),...await getApiGames(3),]
        }
        const apiGames = name?await searchApiGames(name):await getManyApiGames();

        res.json(!name?[...apiGames, ...dbGames.map(game=>toCard(game))]:[...dbGames.map(game=>toCard(game)), ...apiGames ].slice(0, 15));
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
            include: [
                {model: Genre},
                {model: Platform} 
            ]
        });
        if (dbGame) {
            res.json(dbGame)
        } else {
            const apiGame = getApiGame(id);
            apiGame
            .then(game=>res.json(game))
            .catch(e=>res.json({error: 'Doesn\'t exists'}))
        }
        
    } catch (e) {
        next(e)
    }
}

const postGame = async (req, res, next) => {
    try {
        let {name, description, launch_date, rating, platforms, genres, thumbnail} = req.body;
        const date = new Date();
        launch_date ||= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        rating ||= 5;
        thumbnail ||= 'The author didn\'t provide an image';

        const game = await Videogame.create({
            name,
            description,
            launch_date,
            rating,
            thumbnail
        });

        const idGenres = await Genre.findAll({
            where: {name: {[Op.iLike]: { [Op.any]: genres}}},
            attributes: ['id']
        });

        const idPlatforms = await Platform.findAll({
            where: {name: {[Op.iLike]: { [Op.any]: platforms}}},
            attributes: ['id']
        });
        
        await game.addGenres(idGenres.map(genre=>genre.dataValues.id), {through: Videogenre});
        await game.addPlatforms(idPlatforms.map(platform=>platform.dataValues.id), {through: Videoplatform});

        const createdGame = await Videogame
        .findByPk(game.id, 
            {include: [
                {model: Genre},
                {model: Platform} 
            ]});
        res.json(createdGame);
    } catch (e) {
        res.send(e.message)
    }
};

module.exports = {getGames, getGame, postGame}