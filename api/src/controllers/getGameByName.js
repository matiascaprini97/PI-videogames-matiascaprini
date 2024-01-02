const axios = require("axios");
const { Videogame } = require("../db.js");

const URL = "https://api.rawg.io/api/games";
const KEY = "9350cd30f5af4d8392270aa555d4df37";

const getGameByName = async (req, res) => {
    try {
        let array = [];
        const name = req.query;
        const match = await Videogame.findOne({
            where: {
                name: name,
            },
        });
        const obj = (await axios(`${URL}?key=${KEY}`)).data
        const videoGames = [obj];
        const matchDos = videoGames.filter((game) => game.name.lowerCase() === name.lowerCase())
        if (match) array.push(match);
        if (matchDos) {
            matchDos.forEach(element => {
                array.push(element)
            });
        }
        return array
            ? res.json(array)
            : res.status(404).send("Videogame not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


module.exports = getGameByName;