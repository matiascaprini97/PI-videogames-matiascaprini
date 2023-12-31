const axios = require("axios");

const URL = "https://api.rawg.io/api/games/";
const KEY = "9350cd30f5af4d8392270aa555d4df37";


const getGameById = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, description, parent_platforms, background_image, released, rating } = (await axios(`${URL}${id}?key=${KEY}`)).data

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

        const game = { id, name, description, Plataforms: arrPlataform, Image: background_image, released, rating };

        return game.name
            ? res.json(game)
            : res.status(404).send("Game not found");

    } catch (error) {
        return res.status(500).send(error.message)
    };

}


module.exports = getGameById;