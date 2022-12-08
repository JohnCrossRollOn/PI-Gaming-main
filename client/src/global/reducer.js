import {
  GET_GAMES,
  GET_GENRES,
  GET_PLATFORMS,
  SET_PAGE,
  SAVE_SEARCHBAR,
  SAVE_SORTBAR,
  SKELE_GAMES,
  SKELE_DETAIL,
  SAVE_FILTERBAR,
  CLEAR_CONSTRAINTS,
  SEARCH_GAMES,
  ALLOW_SEARCH,
  CLEAR_DISPLAY,
  SAVE_FORM,
  CLEAR_FORM,
  CLEAR_FILTERBAR,
  REMOVELAST_FILTERBAR,
} from "./actions.js";
import { arrayFilter } from "../components/utils";

const initialState = {
  games: [],
  display: [
    {
      skeleton: true,
    },
  ],
  game: { skeleton: true },
  genres: [],
  platforms: [],
  searchbar: {
    input: "",
    query: "",
    state: "",
  },
  filterbar: [],
  sortbar: {
    name: "",
    setting: (a, b) => a.id - b.id,
  },
  page: 0,
  allowsearch: true,
  formState: "",
};

const rootReducer = (state = initialState, action) => {
  Array.prototype.settings = function (
    filterbar = state.filterbar,
    sortbar = state.sortbar
  ) {
    return this.filter((game) => arrayFilter(game, filterbar)).sort(
      sortbar.setting
    );
  };

  switch (action.type) {
    case GET_GAMES:
      return !state.allowsearch
        ? {
            ...state,
            page: 0,
            games: action.payload,
            display: action.payload.settings(),
          }
        : { ...state };

    case SKELE_GAMES:
      return {
        ...state,
        display: new Array(15)
          .fill({ skeleton: true })
          .map((skeleton, id) => ({ ...skeleton, id })),
        page: 0,
      };

    case SEARCH_GAMES:
      return state.allowsearch
        ? {
            ...state,
            page: 0,
            games: action.payload,
            display: action.payload.settings(),
          }
        : { ...state };

    case ALLOW_SEARCH:
      return { ...state, allowsearch: action.payload };

    case SKELE_DETAIL:
      return { ...state, game: { skeleton: true } };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };

    case SET_PAGE:
      return {
        ...state,
        page:
          typeof action.payload === "number"
            ? action.payload
            : action.payload === "next"
            ? state.page + 1
            : action.payload === "prev"
            ? state.page - 1
            : 0,
      };

    case SAVE_SEARCHBAR:
      return { ...state, searchbar: action.payload };

    case SAVE_FILTERBAR:
      const savedFilterbar = state.filterbar.some(
        (setting) => JSON.stringify(setting) === JSON.stringify(action.payload)
      )
        ? [...state.filterbar]
        : [...state.filterbar, action.payload];

      return {
        ...state,
        page: 0,
        filterbar: savedFilterbar,
        display: state.display[0]?.skeleton
          ? state.display
          : state.games.settings(savedFilterbar),
      };

    case REMOVELAST_FILTERBAR:
      const shortenedFilterbar = state.filterbar.splice(-1);

      return {
        ...state,
        page: 0,
        filterbar: shortenedFilterbar,
        display: state.display[0]?.skeleton
          ? state.display
          : state.games.settings(shortenedFilterbar),
      };

    case CLEAR_FILTERBAR:
      const clearedFilterbar = state.filterbar.some(
        (setting) => JSON.stringify(setting) === JSON.stringify(action.payload)
      )
        ? [...state.filterbar].filter(
            (item) => JSON.stringify(item) !== JSON.stringify(action.payload)
          )
        : [...state.filterbar];

      return {
        ...state,
        page: 0,
        filterbar: clearedFilterbar,
        display: state.display[0]?.skeleton
          ? state.display
          : state.games.settings(clearedFilterbar),
      };

    case SAVE_SORTBAR:
      return {
        ...state,
        page: 0,
        sortbar:
          action.payload.name !== state.sortbar.name
            ? action.payload
            : initialState.sortbar,
        display: state.display[0]?.skeleton
          ? state.display
          : state.games.settings(
              undefined,
              action.payload.name !== state.sortbar.name
                ? action.payload
                : initialState.sortbar
            ),
      };

    case CLEAR_CONSTRAINTS:
      return {
        ...state,
        page: 0,
        filterbar: initialState.filterbar,
        sortbar: initialState.sortbar,
        display: state.games,
      };

    case SAVE_FORM:
      return { ...state, formState: action.payload };

    case CLEAR_FORM:
      return { ...state, formState: initialState.formState };

    case CLEAR_DISPLAY:
      return { ...state, display: [] };

    default:
      return { ...state };
  }
};

export default rootReducer;
