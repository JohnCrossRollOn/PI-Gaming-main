import {
    GET_GAMES,
    GET_GAMEDETAIL,
    GET_GENRES,
    SET_PAGE,
    SAVE_SEARCHBAR,
    SAVE_SORTBAR,
    SKELE_GAMEDETAIL
} from "./actions.js";

const initialState = {
    query: false,
    games: [],
    settings: [],
    genres: [],
    game: null,
    searchbar: {
        input: '',
        query: '',
        state: ''
    },
    sortbar: '',
    page: 0
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GAMES:
            return {...state, games: [...action.payload]}
        case GET_GAMEDETAIL:
            return {...state, game: action.payload}
        case SKELE_GAMEDETAIL:
            return {...state, game: null}
        case GET_GENRES:
            return {...state, genres: [...state.genres, ...action.payload]}
        case SET_PAGE:
            return {...state, page: typeof action.payload === 'number'?
            action.payload:
            action.payload?
            state.page+1:state.page-1}
        case SAVE_SEARCHBAR:
            return {...state, searchbar: action.payload}
        case SAVE_SORTBAR:
            return {...state, sortbar:action.payload}
        default:
            return {...state}
    }
}

export default rootReducer;