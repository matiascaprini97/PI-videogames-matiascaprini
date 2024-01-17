import { GET_VIDEOGAMES, GET_VIDEOGAME, GET_SORTED_AZ, GET_VIDEOGAMESNEXT, SET_GAMES, GET_VIDEOGAMESPREV } from "./actions";


const initialState = {
    videoGames: [],
    videoGame: [],
    sortedVideoGameAZ: []
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES:
            return { ...state, videoGames: action.payload };

        case SET_GAMES:
            return { ...state, videoGames: action.payload };

        case GET_VIDEOGAMESNEXT:
            return { ...state, videoGames: action.payload };

        case GET_VIDEOGAMESPREV:
            return { ...state, videoGames: action.payload };

        case GET_VIDEOGAME:
            return { ...state, videoGame: action.payload };

        case GET_SORTED_AZ:

            return { ...state, sortedVideoGameAZ: action.payload };


        default:
            return { ...state };
    }
};
export default rootReducer;