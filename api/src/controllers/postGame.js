const { Videogame, Genre } = require('../db.js');

const postGame = async (req, res) => {
    let unGame = req.body;
    let { genre, name, description, platforms, image, released, rating } = req.body;
    if (name === "" || description === "" || platforms === "" || released === "" || rating === "" || image === "" || genre === "") res.status(400).send("Faltan datos");
    try {
        const [game, created] = await Videogame.findOrCreate({
            where: { name },
            defaults: {
                description,
                platforms,
                image,
                released,
                rating,
            }
        });

        if (created) {
            await game.addGenre(unGame.Genre);
            res.status(200).json("Juego Creado!");
        } else {
            res.status(400).json("Ese juego ya existe!")
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = postGame;
