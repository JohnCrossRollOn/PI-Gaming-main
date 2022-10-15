//ASYNC

export const GET_GAMES = "GET_GAMES";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const GET_GENRES = "GET_GENRES";

const apiUrl = `http://localhost:3001`;

export const Api = async(url, parameter={})=>{
    const response = await fetch(`${apiUrl}/${url}`, parameter)
    return response.json()
}

export const getGames = (name)=>dispatch=>{

    return Api(`videogames${name?`?name=${name}`:''}`)
    .then(data=>dispatch({type: GET_GAMES, payload: data}))
}

export const getGameDetail = (id)=>dispatch=>{

    return Api(`videogames/${id}`)
    .then(data=>dispatch({type: GET_GAME_DETAIL, payload: data}))
}

export const getGenres = ()=>dispatch=>{

    return Api('genres')
    .then(data=>dispatch({type: GET_GENRES, payload: data}))
}

//SYNC

export const SET_PAGE = "SET_PAGE";
export const SET_SEARCHBAR = "SET_SEARCHBAR"

export const setPage = (page)=>dispatch=>dispatch({type: SET_PAGE, payload:page});

export const setSearchBar = (input, query)=>dispatch=>dispatch({type: SET_SEARCHBAR, payload: {input, query}})

