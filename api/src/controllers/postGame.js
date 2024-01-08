const { Videogame } = require('../db.js');

// const postGame = async (req, res) => {
//     let { name, description, plataform, image, released, rating } = req.body;

//     try {
//         if (name && description && plataform && image && released && rating) {
//             await Videogame.findOrCreate({
//                 where: { name, description, plataform, image, released, rating }
//             });
//             const game = await Videogame.findAll();
//             return res.status(201).json(game);
//         }
//         return res.status(401).json({ message: 'Faltan datos' });
//     } catch (error) {
//         return res.status(500).json({ message: error });
//     };
// };

// module.exports = postGame;

const postGame = async (req, res) => {
    let { id, name, description, plataforms, image, released, rating } = req.body;
    if (name === "" || description === "" || plataforms === "" || released === "" || rating === "" || image === "" || id === "") res.status(400).send("Faltan datos");
    try {
        const [game, created] = await Videogame.findOrCreate({
            where: { name },
            defaults: {
                description,
                plataforms,
                image,
                released,
                rating,
                id,
            }
        });

        if (!created) {
            return res.status(400).json({ message: 'El juego ya existe' });
        }

        return res.status(200).json({ game });

    } catch (error) {

        res.status(500).send(error.message);
    }
}

module.exports = postGame;
