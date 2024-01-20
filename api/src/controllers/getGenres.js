const axios = require("axios");


const URL = "https://api.rawg.io/api/genres";
const KEY = "9350cd30f5af4d8392270aa555d4df37";

const { Genre } = require("../db");


let cachedGenres = null; // Variable para almacenar temporalmente los tipos en memoria

const getGenres = async (req, res) => {
    try {
        console.log("Entrando en getGenres");

        // Si los géneros están en caché, responder con ellos
        if (cachedGenres) {
            console.log("Enviando géneros desde caché");
            return res.status(200).json(cachedGenres);
        }

        // Si no hay géneros en caché, intentar obtenerlos de la base de datos
        const genresFromDB = await Genre.findAll();

        // Si hay géneros en la base de datos, almacenarlos en caché y responder
        if (genresFromDB.length > 0) {
            cachedGenres = genresFromDB;
            console.log("Enviando géneros desde la base de datos");
            return res.status(200).json(genresFromDB);
        }

        // Si no hay géneros en la base de datos, obtenerlos de la API
        const response = await axios(`${URL}?key=${KEY}`);
        const genresFromAPI = response.data.results.map((genre) => ({ name: genre.name }));

        // Almacenar los géneros obtenidos de la API en la base de datos
        await Genre.bulkCreate(genresFromAPI);

        // Almacenar los géneros en caché y responder
        cachedGenres = genresFromAPI;
        console.log("Enviando géneros desde la API");
        return res.status(200).json(genresFromAPI);
    } catch (error) {
        console.error("Error en getGenres:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getGenres;