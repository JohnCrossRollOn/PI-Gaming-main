import {
    GET_GAMES,
    GET_GAME_DETAIL,
    GET_GENRES,
    SET_PAGE
} from "./actions.js";

const initialState = {
    query: false,
    games: [],
    settings: [],
    genres: [],
    game: null,
    page: 0
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GAMES:
            return {...state, games: [...action.payload]}
        case GET_GAME_DETAIL:
            return {...state, game: action.payload}
        case GET_GENRES:
            return {...state, genres: [...state.genres, ...action.payload]}
        case SET_PAGE:
            return {...state, page: typeof action.payload === 'number'?
            action.payload:
            action.payload?
            state.page+1:state.page-1}
        default:
            return {...state}
    }
}

export default rootReducer;