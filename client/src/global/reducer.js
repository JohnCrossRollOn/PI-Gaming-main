import {
    GET_GAMES,
    GET_GAMEDETAIL,
    GET_GENRES,
    SET_PAGE,
    SAVE_SEARCHBAR,
    SAVE_SORTBAR,
    SKELE_GAME,
    SAVE_FILTERBAR,
    CLEAR_CONSTRAINTS,
    SEARCH_GAMES,
    ALLOW_SEARCH,
    CLEAR_DISPLAY
} from "./actions.js";
import { arrayFilter } from "../components/utils"

const initialState = {
    games: [],
    display: [],
    game: null,
    genres: [],
    searchbar: {
        input: '',
        query: '',
        state: ''
    },
    filterbar: [],
    sortbar: {
        name:'', 
        setting: (a,b)=>a.id-b.id
    },
    page: 0,
    allowsearch: true
};

const rootReducer = (state = initialState, action) => {

    Array.prototype.settings = function(filterbar=state.filterbar, sortbar=state.sortbar){

        return this.filter(game=>arrayFilter(game, filterbar)).sort(sortbar.setting)
    }
    switch(action.type) {
        case GET_GAMES:

            return !state.allowsearch?{...state, page:0, games: action.payload, display: action.payload.settings()}:{...state}

        case SEARCH_GAMES:

            return state.allowsearch?{...state, page:0, games: action.payload, display: action.payload}:{...state} 

        case ALLOW_SEARCH: 

            return {...state, allowsearch: action.payload}
            
        case GET_GAMEDETAIL:

            return {...state, game: action.payload}

        case SKELE_GAME:

            return {...state, game: null}

        case GET_GENRES:

            return {...state, genres: action.payload}

        case SET_PAGE:

            return {...state, page: typeof action.payload === 'number'?
            action.payload:
            action.payload?
            state.page+1:state.page-1}

        case SAVE_SEARCHBAR:

            return {...state, searchbar: action.payload}

        case SAVE_FILTERBAR:

            const newFilterbar = state.filterbar.some(setting=>JSON.stringify(setting)===JSON.stringify(action.payload))?
            [...state.filterbar].filter(item=>JSON.stringify(item)!==JSON.stringify(action.payload))
            :[...state.filterbar, action.payload ]

            return {...state, page:0, filterbar: newFilterbar, display: state.games.settings(newFilterbar)}

        case SAVE_SORTBAR:

            return {...state, 
            page: 0,    
            sortbar: action.payload.name!==state.sortbar.name?action.payload:initialState.sortbar, 
            display: state.games.settings(undefined, action.payload.name!==state.sortbar.name?action.payload:initialState.sortbar)}

        case CLEAR_CONSTRAINTS:
            
            return {...state, page:0, filterbar:initialState.filterbar, sortbar:initialState.sortbar, display: state.games}
        
        case CLEAR_DISPLAY:

            return {...state, display: []}

        default:
            return {...state}
    }
}

export default rootReducer;