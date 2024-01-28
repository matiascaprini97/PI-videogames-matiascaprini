import axios from 'axios';

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_VIDEOGAMEPORID = "GET_VIDEOGAMEPORID";
export const FILTER = "FILTER";
export const ORDER_ASC = "ORDER_ASC";
export const ORDER_DES = "ORDER_DES";
export const RATING_ASC = "RATING_ASC";
export const RATING_DES = "RATING_DES";
export const SET_GENRES = "SET_GENRES";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const RESET_FILTERS = "RESET_FILTERS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

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

export const filterCards = (genre) => {

    return {
        type: FILTER,
        payload: genre
    }
}
export const orderCards = (sortbyTypeName) => ({
    type: sortbyTypeName,
    payload: sortbyTypeName
});

export const ratingCards = (sortbyTypeName) => ({
    type: sortbyTypeName,
    payload: sortbyTypeName
});

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    payload: currentPage,
});

export const setTotalPages = (gamesPerPage) => (dispatch, getState) => {
    const state = getState();
    const totalPages = Math.ceil(state.videoGames.length / gamesPerPage);

    dispatch({
        type: SET_TOTAL_PAGES,
        payload: totalPages,
    });
};

export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
};

export const resetFilters = () => {

    return {
        type: RESET_FILTERS,
    };
};