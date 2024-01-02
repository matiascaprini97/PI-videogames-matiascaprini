const axios = require("axios");


const URL = "https://api.rawg.io/api/genres";
const KEY = "9350cd30f5af4d8392270aa555d4df37";

const getGenres = async (req, res) => {
    try {
        const arr = (await axios(`${URL}?key=${KEY}`)).data
        const genres = [arr];

        return genres
            ? res.json(genres)
            : res.status(404).send("Genres not found");
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

module.exports = getGenres;