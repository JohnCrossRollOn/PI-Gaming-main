export const GET_GAMES = "GET_GAMES";
export const SEARCH_GAMES = "SEARCH_GAMES";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const GET_GENRES = "GET_GENRES";

export const Api = async(url, parameter={})=>{
    const response = await fetch(`http://localhost:3001/${url}`, parameter)
    return response.json()
}

export const getGames = ()=>dispatch=>{
    return Api('videogames')
    .then(data=>dispatch({type: GET_GAMES, payload: data}))
}

export const searchGames = (name)=>dispatch=>{
    console.log(`Buscando: ${name}`)
    return Api(`videogames?name=${name}`)
    .then(data=>dispatch({type: SEARCH_GAMES, payload: data}))
}

export const getGameDetail = (id)=>dispatch=>{
    return Api(`videogames/${id}`)
    .then(data=>dispatch({type: GET_GAME_DETAIL, payload: data}))
}

export const getGenres = ()=>dispatch=>{
    return Api('genres')
    .then(data=>dispatch({type: GET_GENRES, payload: data}))
}
