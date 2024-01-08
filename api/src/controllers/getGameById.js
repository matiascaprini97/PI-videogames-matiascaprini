const axios = require("axios");

const URL = "https://api.rawg.io/api/games/";
const KEY = "9350cd30f5af4d8392270aa555d4df37";


const getGameById = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, description, plataform, image, released, rating } = (await axios(`${URL}${id}?key=${KEY}`)).data

        const game = { id, name, description, plataform, image, released, rating };

        return game.name
            ? res.json(game)
            : res.status(404).send("Game not found");

    } catch (error) {
        return res.status(500).send(error.message)
    };

}


module.exports = getGameById;