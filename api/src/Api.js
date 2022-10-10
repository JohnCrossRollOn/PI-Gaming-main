const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const {Videogame, Videogenre, Genre} = require('./db.js')

const rawg = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: KEY,
        page_size: 100
    }
});
// (async function() {
//     const raw = await Api.get('/genres');
//     const genres = raw.data.results.forEach(async ({id, name, genres, background_image})=>{
//         const game = {
//         id: id,
//         name: name,
//         genres: genres.map(({id, name})=>{return {id, name}}),
//         thumbnail: background_image
//         }
//         const videogame = await Videogame.create(game);
//     });
// })();

// (async function() {
//     const raw = await Api.get('/games');
//     const games = raw.data.results.forEach(async ({id, name, genres, background_image})=>{
//         const game = {
//         id: id,
//         name: name,
//         genres: genres.map(({id, name})=>{return {id, name}}),
//         thumbnail: background_image
//         }
//         const videogame = await Videogame.create(game);
//     });
//     games.forEach(async game=>{
//     const videogame = await Videogame.create(game);
//     game.genres.forEach(async genre=>{
//         const genre = await Genre.findByPk();
//     })
//     // 2. Find the Classes row
    
    
//     // 3. INSERT the association in Enrollments table
//     await student.addClass(classRow, { through: Enrollment });
//     })
// })();

// const dbGames = RAWdbGames.map(({id, name, genres, thumbnail})=>{
//     return {id, name, genres, thumbnail}
// })
// const games = [...apiGames, ...dbGames]
// res.json(games);

module.exports = rawg