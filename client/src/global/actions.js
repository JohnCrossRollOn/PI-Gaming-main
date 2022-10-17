//ASYNC

export const GET_GAMES = "GET_GAMES";
export const GET_GAMEDETAIL = "GET_GAME_DETAIL";
export const GET_GENRES = "GET_GENRES";

const apiUrl = `http://localhost:3001`;

export const Api = async(url, parameter={})=>{
    const response = await fetch(`${apiUrl}/${url}`, parameter)
    return response.json()
}

export const getGames = (name)=>dispatch=>{
    console.log(name?`se busco${name}`:'se busco todo')
    return Api(`videogames${name?`?name=${name}`:''}`)
    .then(data=>dispatch({type: GET_GAMES, payload: data}))
}

export const getGameDetail = (id)=>dispatch=>{

    return Api(`videogames/${id}`)
    .then(data=>dispatch({type: GET_GAMEDETAIL, payload: data}))
}

export const getGenres = ()=>dispatch=>{

    return Api('genres')
    .then(data=>dispatch({type: GET_GENRES, payload: data}))
}

//SYNC

export const SET_PAGE = "SET_PAGE";
export const SAVE_SEARCHBAR = "SAVE_SEARCHBAR";
export const SAVE_SORTBAR = "SAVE_SORTBAR";
export const SKELE_GAMEDETAIL = "SKELE_GAMEDETAIL";

export const setPage = (page)=>dispatch=>dispatch({type: SET_PAGE, payload:page});

export const saveSearchBar = (searchbar)=>dispatch=>dispatch({type: SAVE_SEARCHBAR, payload: searchbar})

export const saveSortBar = (sortbar)=>dispatch=>dispatch({type: SAVE_SORTBAR, payload: sortbar})

export const skeleGameDetail = ()=>dispatch=>dispatch({type: SKELE_GAMEDETAIL});

