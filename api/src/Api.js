const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const { Videogame, Videogenre, Genre } = require('./db.js');

const Api = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: KEY
    }
});

const toCard = ({name, id, genres, rating, background_image})=>{
    return {
        id: id,
        name:name,
        rating: rating,
        thumbnail: background_image,
        source: 'api',
        genres: genres
    };
};

const toDetail = ({name, description_raw, released, platforms, background_image, rating, genres}) => {
    const game =  {
        name: name,
        rating: rating,
        launch_date: released,
        description: description_raw,
        platforms: platforms.map(platform=>platform.platform),
        thumbnail: background_image,
        genres: genres,
        source: 'api'
    };
    return game;
};

const addApiGenresToDB = async (page) => {
    const apiGenres = (await Api.get('/genres', {params: {page: page}})).data.results
    .map(({id, name})=>{return {id, name}});
    await Genre.bulkCreate(apiGenres)
};

const getApiGames = async (page) => {
    const apiGames = (await Api.get('/games', {params: {page: page, page_size: 40}})).data.results;
    
    return apiGames.map(apiGame=>toCard(apiGame))
};

const searchApiGames = async (name) => {
    const apiGames = (await Api.get('/games', {params: {page_size: 15, search: name}})).data.results;
    
    return apiGames.map(apiGame=>toCard(apiGame))
}

const getApiGame = async (id) => {
    const apiGame = await Api.get(`/games/${id}`);
    return toDetail(apiGame.data)
};

module.exports = {Api, addApiGenresToDB, getApiGames, searchApiGames, getApiGame}