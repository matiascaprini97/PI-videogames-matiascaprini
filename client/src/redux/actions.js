import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_VIDEOGAMESNEXT = "GET_VIDEOGAMENEXT";
export const GET_SORTED_AZ = "GET_SORTED_AZ";
export const SET_GAMES = "SET_GAMES";
export const GET_VIDEOGAMESPREV = "GET_VIDEOGAMESPREV";

export const getVideogame = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/videogames/${id}`)
        const videoGame = apiData.data;
        console.log(videoGame);
        dispatch({ type: GET_VIDEOGAME, payload: videoGame })
    }
}

export const setGames = (games) => {
    return {
        type: SET_GAMES,
        payload: games,
    };
};

export const getVideogames = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/videogames");
        const videoGames = apiData.data[0].results;
        dispatch({ type: GET_VIDEOGAMES, payload: videoGames })
    };

}

export const getVideogamesNext = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/videogames");
        const videoGames = apiData.data[0].next;
        const apiDataDos = await axios.get(videoGames);
        const arr = apiDataDos.data.results;
        dispatch({ type: GET_VIDEOGAMESNEXT, payload: arr })
    };

}

export const getVideogamesPrev = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/videogames");
        const videoGames = apiData.data[0].next;
        const apiDataDos = await axios.get(videoGames);
        const arr = apiDataDos.data.results;
        dispatch({ type: GET_VIDEOGAMESPREV, payload: arr })
    };

}

export const fetchGames = (searchTerm) => {
    return async (dispatch) => {
        try {
            let url = "http://localhost:3001/videogames";

            if (searchTerm) {
                url = `http://localhost:3001/videogames/name?name=${searchTerm}`;
            }

            const { data } = await axios.get(url);
            const dbGames = data;

            let allGames = [];

            if (dbGames.length > 0) {
                allGames = dbGames;
            } else {
                const response = await axios.get("http://localhost:3001/videogames");
                allGames = response.data;
            }

            dispatch(setGames(allGames));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
};


export const getVideogamesSorted = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/videogames");
        const videoGames = apiData.data;
        const sortedVideoGameAZ = videoGames.sort((a, b) => a - b);
        dispatch({ type: GET_SORTED_AZ, payload: sortedVideoGameAZ })
    };
};