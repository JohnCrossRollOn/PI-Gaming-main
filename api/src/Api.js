const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const {Videogame, Videogenre, Genre} = require('./db.js');
const { Op } = require('sequelize');

const Api = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: KEY,
        page_size: 100
    }
});
const addApiToDB = async () => {
    const apiGenres = (await Api.get('/genres')).data.results
    .map(({id, name})=>{return {id, name}});
    await Genre.bulkCreate(apiGenres)

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

        const genresId = genres.map(({id})=>parseInt(id));
        const gameGenreRows = await Genre.findAll({where: {id: genresId}});
        await dbGame.addGenres(gameGenreRows, {through: Videogenre})
    }
};

module.exports = {Api, addApiToDB};