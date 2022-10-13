import {
    GET_GAMES,
    GET_GAME_DETAIL,
    SEARCH_GAMES,
    GET_GENRES,
} from "./actions.js";

const initialState = {
    games: [],
    genres: [],
    game: {
        name: "",
        description: "",
        launch_date: "",
        rating: 0,
        platforms: [],
        thumbnail: "",
        genres: [
            {
                "id": 0,
                "name": ""
            }
        ]
    }
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GAMES:
            return {...state, games: [...action.payload]}
        case SEARCH_GAMES:
            return {...state, games: [...action.payload]}
        case GET_GAME_DETAIL:
            return {...state, game: action.payload}
        case GET_GENRES:
            return {...state, genres: [...state.genres, ...action.payload]}
        default:
            return {...state}
    }
}

export default rootReducer;