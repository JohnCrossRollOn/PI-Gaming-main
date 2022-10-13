const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const { Videogame, Videogenre, Genre } = require('./db.js');

const Api = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: KEY,
        page_size: 40,
    }
});

const addApiGenresToDB = async (page) => {
    const apiGenres = (await Api.get('/genres', {params: {page: page}})).data.results
    .map(({id, name})=>{return {id, name}});
    await Genre.bulkCreate(apiGenres)
}

const addApiGamesToDB = async (page) => {
    const apiGames = (await Api.get('/games', {params: {page: page}})).data.results;
    for (let apiGame of apiGames) {
        const {name, genres, released, rating, parent_platforms, background_image} = apiGame;
        const game = {
            name: name,
            description: name,
            launch_date: released,
            rating: rating,
            platforms: parent_platforms.map(platform=>platform.platform.name),
            thumbnail: background_image,
            source: 'api'
        };
        const dbGame = await Videogame.create(game);

        const genresId = genres.map(({id})=>parseInt(id));
        const gameGenreRows = await Genre.findAll({where: {id: genresId}});
        await dbGame.addGenres(gameGenreRows, {through: Videogenre})
    }
};

module.exports = {addApiGenresToDB, addApiGamesToDB};