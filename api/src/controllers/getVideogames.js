//Obtiene un arreglo de objetos, donde cada objeto
// es un videojuego con su información.

const axios = require("axios");


const URL = "https://api.rawg.io/api/games";
const KEY = "9350cd30f5af4d8392270aa555d4df37";

const getVideogames = async (req, res) => {
    try {
        const arr = (await axios(`${URL}?key=${KEY}`)).data
        const videoGames = [arr];

        return videoGames
            ? res.json(videoGames)
            : res.status(404).send("Videogames not found");
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

module.exports = getVideogames;