import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME,
    ORDER_ASC,
    ORDER_DES,
    GET_VIDEOGAMEPORID,
    SET_GENRES,
    FILTER,
    SET_TOTAL_PAGES,
    SET_CURRENT_PAGE,
    RESET_FILTERS,
    FILTER_BY_ORIGIN
} from "./actions";


const initialState = {
    videoGames: [],
    oVideoGames: [],
    videoGame: [],
    genres: [],
    // currentPage: 1,
    // gamesPerPage: 20,
    // storedPage: "",
    // totalPages: 1,
    originFilter: 'ALL',
    sortBy: "Reset All",
    sortOrder: "asc",
    genreFilter: "Select Genre",
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES:
            return { ...state, oVideoGames: action.payload, videoGames: action.payload };

        case GET_VIDEOGAMEPORID:
            return { ...state, videoGame: action.payload };

        case GET_VIDEOGAME:
            return { ...state, videoGames: action.payload };

        case FILTER:
            const filteredGenres = action.payload === "" // Chequea si se seleccionó "Select Genre"
                ? state.oVideoGames // Utiliza la lista completa de los juegos
                : state.videoGames.filter((game) => game.genres.some(genre => genre.name === action.payload));

            return {
                ...state,
                videoGames: filteredGenres,
                genreFilter: action.payload,
            };

        case ORDER_ASC:
            return {
                ...state,
                videoGames: state.videoGames.slice().sort((a, b) => a.name.localeCompare(b.name)),
                sortBy: action.payload
            };

        case ORDER_DES:
            return {
                ...state,
                videoGames: state.videoGames.slice().sort((a, b) => b.name.localeCompare(a.name)),
                sortBy: action.payload
            };

        case SET_GENRES:
            return { ...state, genres: action.payload };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload,
            };

        case RESET_FILTERS:
            console.log('RESET FILTERS');
            return {
                ...state,
                sortBy: "Reset All",
                originFilter: "All",
                genreFilter: "Select Genre",
                videoGames: state.oVideoGames,
            };

        case FILTER_BY_ORIGIN:

            const filteredGamesOrigin = action.payload === 'All'
                ? state.oVideoGames // Utiliza la lista completa de games
                : state.oVideoGames.filter((game) => {
                    // Si el origen seleccionado es 'All', devuelve true para todos los games
                    // Si el origen seleccionado es 'API', filtra por api: true
                    // Si el origen seleccionado es 'DDBB', filtra por api: false
                    return action.payload === 'All' || (action.payload === 'API' ? game.api : !game.api);
                });

            return {
                ...state,
                videoGames: filteredGamesOrigin,
                originFilter: action.payload,
            };

        default:
            return { ...state };
    }
};
export default rootReducer;