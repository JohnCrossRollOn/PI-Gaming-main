//UI_UX
export const SKELE_GAME = "SKELE_GAME";
export const SKELE_GAMES = "SKELE_GAMEDETAIL"
export const CLEAR_DISPLAY = "CLEAR_DISPLAY";;

export const skeleGames = ()=>dispatch=>dispatch({type: SKELE_GAMES});
export const skeleGame = ()=>dispatch=>dispatch({type: SKELE_GAME});
export const clearDisplay = ()=>dispatch=>dispatch({type: CLEAR_DISPLAY})

//ASYNC

export const GET_GAMES = "GET_GAMES";
export const SEARCH_GAMES = "SEARCH_GAMES";
export const GET_GAMEDETAIL = "GET_GAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const ALLOW_SEARCH = "ALLOW_SEARCH";

const apiUrl = `http://localhost:3001`;

export const Api = async(url, parameter={})=>{
    const response = await fetch(`${apiUrl}/${url}`, parameter)
    return response.json()
}

export const getGames = ()=>dispatch=>{
    console.log('se busco todo')
    dispatch({type: ALLOW_SEARCH, payload: false})
    return Api(`videogames`)
    .then(data=>dispatch({type: GET_GAMES, payload: data}))
}

export const searchGames = (name)=>dispatch=>{
    dispatch({type: ALLOW_SEARCH, payload: true})
    return Api(`videogames${name?`?name=${name}`:''}`)
    .then(data=>dispatch({type: SEARCH_GAMES, payload: data}))
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
export const SAVE_FILTERBAR = "SAVE_FILTERBAR";
export const SAVE_SORTBAR = "SAVE_SORTBAR";
export const CLEAR_CONSTRAINTS = "CLEAR_CONSTRAINTS";


export const setPage = (page)=>dispatch=>dispatch({type: SET_PAGE, payload:page});

export const saveSearchBar = (searchbar)=>dispatch=>{
    dispatch({type: SAVE_SEARCHBAR, payload: searchbar});
};

export const saveFilterBar = (filterBar)=>dispatch=>{
    dispatch({type: SAVE_FILTERBAR, payload: filterBar});
};

export const saveSortBar = (sortbar)=>dispatch=>{
    dispatch({type: SAVE_SORTBAR, payload: sortbar});
};

export const clearConstraints = ()=>dispatch=>dispatch({type: CLEAR_CONSTRAINTS})

