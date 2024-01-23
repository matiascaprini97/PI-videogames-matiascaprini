import { GET_VIDEOGAMES, GET_VIDEOGAME, ORDER, GET_VIDEOGAMEPORID, SET_GENRES, FILTER } from "./actions";


const initialState = {
    videoGames: [],
    videoGame: [],
    genres: [],
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES:
            return { ...state, videoGames: action.payload };

        case GET_VIDEOGAMEPORID:
            return { ...state, videoGame: action.payload };

        case GET_VIDEOGAME:
            return { ...state, videoGames: action.payload };

        case FILTER:
            return { ...state, videoGames: state.videoGames.filter((char) => char.genres === action.payload) };

        case ORDER:
            let copy = state.videoGames.sort((a, b) => {
                if (action.payload === "A") {
                    return a.id - b.id;
                } else if (action.payload === "D") {
                    return b.id - a.id;
                } else {
                    return 0;
                }
            })
            return { ...state, videoGames: copy };

        case SET_GENRES:
            return { ...state, genres: action.payload };

        default:
            return { ...state };
    }
};
export default rootReducer;