//UI_UX
export const SKELE_GAMES = "SKELE_GAMES";
export const SKELE_DETAIL = "SKELE_DETAIL";
export const CLEAR_DISPLAY = "CLEAR_DISPLAY";

export const clearDisplay = () => (dispatch) =>
  dispatch({ type: CLEAR_DISPLAY });

//ASYNC

export const GET_GAMES = "GET_GAMES";
export const SEARCH_GAMES = "SEARCH_GAMES";
export const CLEAR_GAMEDETAIL = "CLEAR_GAMEDETAIL";
export const POST_GAME = "POST_GAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const ALLOW_SEARCH = "ALLOW_SEARCH";

const API_URL =
  process.env?.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3001";

export const getApi = async (url, content, parameter = {}) => {
  const response = await fetch(`${API_URL}/${url}`, parameter);
  return response.json();
};

export const postApi = async (url, content, parameter = {}) => {
  const response = await fetch(`${API_URL}/${url}`, {
    ...parameter,
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
};

export const getGames = () => (dispatch) => {
  console.log("Getting every game!");
  dispatch({ type: SKELE_GAMES });
  dispatch({ type: ALLOW_SEARCH, payload: false });
  return getApi(`videogames`).then((data) =>
    dispatch({ type: GET_GAMES, payload: data })
  );
};

export const searchGames = (name) => (dispatch) => {
  console.log(`You searched for "${name}" !`);
  dispatch({ type: SKELE_GAMES });
  dispatch({ type: ALLOW_SEARCH, payload: true });
  return getApi(`videogames${name ? `?name=${name}` : ""}`).then((data) =>
    dispatch({ type: SEARCH_GAMES, payload: data })
  );
};

export const getGameDetail = async (id) => {
  const game = await getApi(`videogames/${id}`);
  return game;
};

export const getGenres = () => (dispatch) => {
  return getApi("genres").then((data) =>
    dispatch({ type: GET_GENRES, payload: data })
  );
};

export const getPlatforms = () => (dispatch) => {
  return getApi("platforms").then((data) =>
    dispatch({ type: GET_PLATFORMS, payload: data })
  );
};

//SYNC

export const SET_PAGE = "SET_PAGE";
export const SAVE_SEARCHBAR = "SAVE_SEARCHBAR";
export const SAVE_FILTERBAR = "SAVE_FILTERBAR";
export const REMOVELAST_FILTERBAR = "REMOVELAST_FILTERBAR";
export const CLEAR_FILTERBAR = "CLEAR_FILTERBAR";
export const SAVE_SORTBAR = "SAVE_SORTBAR";
export const CLEAR_CONSTRAINTS = "CLEAR_CONSTRAINTS";
export const SAVE_FORM = "SAVE_FORM";
export const CLEAR_FORM = "CLEAR_FORM";

export const setPage = (page) => (dispatch) => {
  dispatch({ type: SET_PAGE, payload: page });
};

export const saveSearchBar = (searchbar) => (dispatch) => {
  dispatch({ type: SAVE_SEARCHBAR, payload: searchbar });
};

export const saveFilterBar = (filterbar) => (dispatch) => {
  dispatch({ type: SAVE_FILTERBAR, payload: filterbar });
};

export const removeLastFilterBar = () => (dispatch) => {
  dispatch({ type: REMOVELAST_FILTERBAR });
};

export const clearFilterBar = (filterbar) => (dispatch) => {
  dispatch({ type: CLEAR_FILTERBAR, payload: filterbar });
};

export const saveSortBar = (sortbar) => (dispatch) => {
  dispatch({ type: SAVE_SORTBAR, payload: sortbar });
};

export const clearConstraints = () => (dispatch) =>
  dispatch({ type: CLEAR_CONSTRAINTS });

export const saveForm = (form) => (dispatch) =>
  dispatch({ type: SAVE_FORM, payload: form });

export const clearForm = () => (dispatch) => dispatch({ type: CLEAR_FORM });
