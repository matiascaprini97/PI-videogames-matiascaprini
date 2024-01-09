const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db.js");

const URL = "https://api.rawg.io/api/games/{name}";
const KEY = "9350cd30f5af4d8392270aa555d4df37";

const getGameByName = async (req, res) => {
    try {
        const { name } = req.query;
        // Buscar en la base de datos local
        console.log("Buscando en la base de datos local...");
        const gameNameDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });
        console.log("Resultados de la base de datos local:", gameNameDB);
        // Si se encontraron resultados en la base de datos local, devolverlos

        if (gameNameDB.length > 0) {
            return res.status(200).json(gameNameDB);
        }

        // Si no se encontraron resultados en la base de datos local, buscar en la API

        const { data } = await axios(`${URL.replace('{name}', encodeURIComponent(name))}?key=${KEY}`);
        const { description, parent_platforms, background_image, released, rating, id } = data;
        console.log("Respuesta de la API:", data);
        const arrPlataform = [];

        if (parent_platforms) {
            for (var i = 0; i < parent_platforms.length; i++) {
                // Verificar si la propiedad "platform" existe en el objeto actual
                if (parent_platforms[i].platform && parent_platforms[i].platform.name) {
                    // Agregar el nombre de la plataforma al nuevo array
                    arrPlataform.push(parent_platforms[i].platform.name);
                }
            }
        }

        const gameNameAPI = {
            id,
            name,
            image: background_image,
            description,
            plataform: arrPlataform,
            released,
            rating,
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