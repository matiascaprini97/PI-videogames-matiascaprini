const axios = require("axios");
const { Videogame, Genre } = require("../db")

const URL = "https://api.rawg.io/api/games/";
const KEY = "9350cd30f5af4d8392270aa555d4df37";


const getGameById = async (req, res) => {

    try {
        const { id } = req.params;
        const idDb = await Videogame.findByPk(id)
        console.log(idDb, "REspuesta")
        if (idDb) {
            res.status(200).json(idDb)
        }

        const { name, description, parent_platforms, background_image, released, rating, genres } = (await axios(`${URL}${id}?key=${KEY}`)).data

        const arrPlataform = [];
        const arrGenres = [];

        if (parent_platforms) {
            for (var i = 0; i < parent_platforms.length; i++) {
                // Verificar si la propiedad "platform" existe en el objeto actual
                if (parent_platforms[i].platform && parent_platforms[i].platform.name) {
                    // Agregar el nombre de la plataforma al nuevo array
                    arrPlataform.push(parent_platforms[i].platform.name);
                }
            }

        }
        if (genres) {
            for (var i = 0; i < genres.length; i++) {
                // Verificar si la propiedad "platform" existe en el objeto actual
                if (genres[i].name) {
                    // Agregar el nombre de la plataforma al nuevo array
                    arrGenres.push(genres[i].name);
                }
            }

        }




        const game = { id, name, description, platforms: arrPlataform, image: background_image, released, rating, genres: arrGenres };

        return game.name
            ? res.json(game)
            : res.status(404).send("Game not found");


    } catch (error) {
        return res.status(500).send(error.message)
    };

}


module.exports = getGameById;