const { Videogame } = require('../db.js');

const postGame = async (req, res) => {
    let { name, description, plataform, image, released, rating } = req.body;

    try {
        if (name && description && plataform && image && released && rating) {
            await Videogame.findOrCreate({
                where: { name, description, plataform, image, released, rating }
            });
            const game = await Videogame.findAll();
            return res.status(201).json(game);
        }
        return res.status(401).json({ message: 'Faltan datos' });
    } catch (error) {
        return res.status(500).json({ message: error });
    };
};

module.exports = postGame;