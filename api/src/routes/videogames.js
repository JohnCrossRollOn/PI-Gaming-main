const { Router } = require('express');
const rawg = require('./rawg.js');
const {Videogame, Genre, videogame_genre} = require('../db.js');

//populate genres
rawg.get('/genres')
.then(p=>p.data.results)
.then(data=>data.map(({id, name})=>{
    return {
        id, 
        name, 
        source: 'API'
    }}))
.then(async data=> await Genre.bulkCreate(data));

//Populate videogames
rawg.get('/games')
.then(p=>p.data.results)
.then(data=>{
    const games = data.forEach(async ({id, name, released, rating, parent_platforms, genres})=>{
    const game = {
        id: parseInt(id),
        name,
        description: name,
        launch_date: released,
        rating,
        platforms: parent_platforms.map(platform=>platform.name),
        source: 'API'
    }
    const gameGenres = genres.map(genre=>parseInt(genre.id));
    const videogame = await Videogame.create(game)
    const genreRows =  await gameGenres.map(async Id => await Genre.findByPk(Id));
    gameGenres.forEach(async id=>{
        videogame.addGenres(await Genre.findByPk(id), {through: videogame_genre})
    })
    })
})
async function GetGame(id) {
    const Game = await Videogame.findOne({
        where: { id },
        include: Genre
    });

    console.log(Game.toJSON()); 
}
GetGame("10035")

const videogames = Router();

videogames.get('/', async (req, res)=>{
    try {
        const api_games = await rawg.get('/games');
        const api = api_games.data.results;
        const db = await Videogame.findAll();
        console.log('Api Games:', api.length, '\n', 'DB Games:',  db.length)
        res.json(api[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message)
    }
})

module.exports = videogames;