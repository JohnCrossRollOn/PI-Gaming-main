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
export const POST_GAME = "POST_GAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const ALLOW_SEARCH = "ALLOW_SEARCH";

const apiUrl = `http://localhost:3001`;

export const getApi = async(url, content, parameter={})=>{
    const response = await fetch(`${apiUrl}/${url}`, parameter)
    return response.json()
}

export const postApi = async(url, content, parameter={})=>{
    const response = await fetch(`${apiUrl}/${url}`, {
        ...parameter,
        method: "POST",
        body: JSON.stringify(content),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return response.json()
}

export const getGames = ()=>dispatch=>{
    console.log('Getting every game!')
    dispatch({type: ALLOW_SEARCH, payload: false})
    dispatch({type: SKELE_GAMES})
    return getApi(`videogames`)
    .then(data=>dispatch({type: GET_GAMES, payload: data}))
}

export const searchGames = (name)=>dispatch=>{
    console.log(`You searched for "${name}" !`)
    dispatch({type: ALLOW_SEARCH, payload: true})
    dispatch({type: SKELE_GAMES})
    return getApi(`videogames${name?`?name=${name}`:''}`)
    .then(data=>dispatch({type: SEARCH_GAMES, payload: data}))
}

export const getGameDetail = (id)=>dispatch=>{

    return getApi(`videogames/${id}`)
    .then(data=>dispatch({type: GET_GAMEDETAIL, payload: data}))
}

export const getGenres = ()=>dispatch=>{

    return getApi('genres')
    .then(data=>dispatch({type: GET_GENRES, payload: data}))
}

export const getPlatforms = ()=>dispatch=>{

    return getApi('platforms')
    .then(data=>dispatch({type: GET_PLATFORMS, payload: data}))
}

//SYNC

export const SET_PAGE = "SET_PAGE";
export const SAVE_SEARCHBAR = "SAVE_SEARCHBAR";
export const SAVE_FILTERBAR = "SAVE_FILTERBAR";
export const SAVE_SORTBAR = "SAVE_SORTBAR";
export const CLEAR_CONSTRAINTS = "CLEAR_CONSTRAINTS";
export const SAVE_FORM = "SAVE_FORM";
export const CLEAR_FORM = "CLEAR_FORM";


export const setPage = (page)=>dispatch=>{
    dispatch({type: SET_PAGE, payload:page})
}

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

export const saveForm = (form)=>dispatch=>dispatch({type: SAVE_FORM, payload: form})

export const clearForm = ()=>dispatch=>dispatch({type: CLEAR_FORM})