const { Router } = require('express');
const { getGames, getGenres } = require('../controllers/videogame.js');

// //populate genres
// rawg.get('/genres')
// .then(p=>p.data.results)
// .then(data=>data.map(({id, name})=>{
//     return {
//         id, 
//         name, 
//         source: 'API'
//     }}))
// .then(async data=> await Genre.bulkCreate(data));

// //Populate videogames
// rawg.get('/games')
// .then(p=>p.data.results)
// .then(data=>{
//     const games = data.forEach(async ({id, name, released, rating, parent_platforms, genres})=>{
//     const game = {
//         id: parseInt(id),
//         name,
//         description: name,
//         launch_date: released,
//         rating,
//         platforms: parent_platforms.map(platform=>platform.name),
//         source: 'API'
//     }
//     const gameGenres = genres.map(genre=>parseInt(genre.id));
//     const videogame = await Videogame.create(game)
//     const genreRows =  await gameGenres.map(async Id => await Genre.findByPk(Id));
//     gameGenres.forEach(async id=>{
//         videogame.addGenres(await Genre.findByPk(id), {through: videogame_genre})
//     })
//     })
// })
// async function GetGame(id) {
//     const Game = await Videogame.findOne({
//         where: { id },
//         include: Genre
//     });

//     console.log(Game.toJSON()); 
// }
// GetGame("10035")

const videogames = Router();

videogames.get('/', getGames);
videogames.get('/genres', getGenres);

module.exports = videogames;