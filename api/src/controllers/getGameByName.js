const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db.js");

const URL = "https://api.rawg.io/api/games/{name}";
const KEY = "9350cd30f5af4d8392270aa555d4df37";

const getGameByName = async (req, res) => {
    try {
        const { name } = req.query;
        // Buscar en la base de datos local
        const gameNameDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });
        // Si se encontraron resultados en la base de datos local, devolverlos

        if (gameNameDB.length > 0) {
            return res.status(200).json(gameNameDB);
        }

        // Si no se encontraron resultados en la base de datos local, buscar en la API

        const { data } = await axios(`${URL.replace('{name}', encodeURIComponent(name))}?key=${KEY}`);
        const { description, plataform, image, released, rating, id } = data;
        const gameNameAPI = {
            id: id || null,
            name: name || null,
            image: image || null,
            description: description || null,
            plataform: plataform || null,
            released: released || null,
            rating: rating || null,
        };

        console.log("Respuesta de la API:", gameNameAPI); // Agrega esta línea para depurar

        // Verificar si la respuesta de la API tiene la estructura esperada
        if (!gameNameAPI || typeof gameNameAPI !== "object" || !gameNameAPI.name) {
            console.error("La respuesta de la API no es válida:", gameNameAPI);
            return res.status(404).json({
                message: "No se encontraron juegos con el nombre proporcionado.",
            });
        }

        return res.status(200).json([gameNameAPI]);
    } catch (error) {
        console.error("Error en la función getGameByName:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getGameByName;