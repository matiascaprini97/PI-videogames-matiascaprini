import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
// export const GET_VIDEOGAMESNEXT = "GET_VIDEOGAMENEXT";
export const GET_SORTED_AZ = "GET_SORTED_AZ";
// export const GET_VIDEOGAMESPREV = "GET_VIDEOGAMESPREV";
export const GET_VIDEOGAMEPORID = "GET_VIDEOGAMEPORID";
export const SET_GENRES = "SET_GENRES";

export const getVideogamePorId = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/videogames/${id}`)
        const videoGame = apiData.data;
        console.log(videoGame);
        dispatch({ type: GET_VIDEOGAMEPORID, payload: videoGame })
    }
}

export const getVideogame = (searchTerm) => {
    return async (dispatch) => {
        try {
            let url = "http://localhost:3001/videogames";

            if (searchTerm) {
                url = `http://localhost:3001/name?name=${searchTerm}`;
            }

            const { data } = await axios.get(url);
            const dbGames = [data];

            let allGames = [];

            if (dbGames.length > 0) {
                allGames.push(dbGames);
            } else {
                const response = await axios.get("http://localhost:3001/videogames");
                allGames = response.data;
            }

            dispatch({ type: GET_VIDEOGAME, payload: dbGames })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
};

const setGenres = (genres) => ({
    type: SET_GENRES,
    payload: genres,
});

export const fetchGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/genres");
            const genres = response.data;
            dispatch(setGenres(genres));
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };
};


export const getVideogames = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/videogames");
        const videoGames = apiData.data;
        dispatch({ type: GET_VIDEOGAMES, payload: videoGames })
    };

}

// export const getVideogamesNext = () => {
//     return async function (dispatch) {
//         const apiData = await axios.get("http://localhost:3001/videogames");
//         const videoGames = apiData.data.next;
//         const apiDataDos = await axios.get(videoGames);
//         const arr = apiDataDos.data.results;
//         dispatch({ type: GET_VIDEOGAMESNEXT, payload: arr })
//     };

// }

// export const getVideogamesPrev = () => {
//     return async function (dispatch) {
//         const apiData = await axios.get("http://localhost:3001/videogames");
//         const videoGames = apiData.data.next;
//         const apiDataDos = await axios.get(videoGames);
//         const arr = apiDataDos.data.results;
//         dispatch({ type: GET_VIDEOGAMESPREV, payload: arr })
//     };

// }

export const getVideogamesSorted = () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/videogames");
        const videoGames = apiData.data;
        const sortedVideoGameAZ = videoGames.sort((a, b) => a - b);
        dispatch({ type: GET_SORTED_AZ, payload: sortedVideoGameAZ })
    };
};