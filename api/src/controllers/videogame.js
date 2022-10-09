const Api = require('./Api.js');
const { Videogame , Genre, Videogenre } = require('../db.js');

const getGames = async (req, res) => {
try {
    const RAWapiGames = (await Api.get('/games')).data.results;
    const RAWdbGames = await Videogame.findAll();
    const apiGames = RAWapiGames.map(({id, name, genres, background_image})=>{return{
        id: id,
        name: name,
        genres: genres.map(genre=>genre.name),
        thumbnail: background_image
    }})
    const dbGames = RAWdbGames.map(({id, name, genres, thumbnail})=>{
        return {id, name, genres, thumbnail}
    })
    const games = [...apiGames, ...dbGames]
    res.json(games);
} catch (error) {
    console.error(error);
    res.status(500).send(error.message)
}
}

module.exports = {getGames}