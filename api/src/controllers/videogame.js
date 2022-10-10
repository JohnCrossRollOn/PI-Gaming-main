const Api = require('../Api.js');
const { Videogame , Genre, Videogenre } = require('../db.js');

const addApiGenresToDB = async () => {
    const apiGenres = (await Api.get('/genres')).data.results
    .map(({id, name})=>{return {id, name}});
    Genre.bulkCreate(apiGenres)
};


const addApiGamesToDB = async () => {
    const apiGames = (await Api.get('/games')).data.results
    .forEach(async ({id, name, genres, released, rating, parent_platforms, background_image})=>{
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
    });
};

const addApiToDB = async ()=>{
    addApiGenresToDB();
    addApiGamesToDB();
};
addApiToDB();

// Videogame.findOne({where: {id:"3498"}, include: Genre}).then(r=>console.log(r))



const getGames = async (req, res) => {
    const {game} = req.query;
    if (game) {
        const dbGame = await Videogame.findAll({where: {id: game}, include: Genre})
        res.json(dbGame);
    } else {
        const RAWapiGames = (await Api.get('/games')).data.results;
        res.json(RAWapiGames)
    }
    
}
const getGenres = async (req, res) => {
    const apiGenres = (await Api.get('/genres')).data.results
    .map(({id, name})=>{return {id, name}});
    res.json(apiGenres)
}


module.exports = {getGames, getGenres}