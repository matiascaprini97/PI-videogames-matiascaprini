// const { Videogame } = require('../db.js');

// const postGame = async (req, res) => {
//     let unGame = req.body;
//     let { genre, name, description, platforms, image, released, rating } = req.body;
//     if (name === "" || description === "" || platforms === "" || released === "" || rating === "" || image === "" || genre === "") res.status(400).send("Faltan datos");
//     try {
//         const [game, created] = await Videogame.findOrCreate({
//             where: { name },
//             defaults: {
//                 description,
//                 platforms,
//                 image,
//                 released,
//                 rating,
//             }
//         });

//         if (created) {
//             await game.addGenres(unGame.genre);
//             res.status(200).json("Juego Creado!");
//         } else {
//             res.status(400).json("Ese juego ya existe!")
//         }

//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

// module.exports = postGame;
const { Videogame, Genre } = require('../db.js');

const postGame = async (req, res) => {

    let { genre, name, description, platforms, image, released, rating } = req.body;
    console.log('Géneros recibidos:', genre);
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

        if (!created) {
            return res.status(400).json({ success: false, message: 'El juego ya existe' });
        }

        const genreInstances = await Genre.findAll({
            where: { name: genre },
        });

        console.log('Instancias de género encontradas:', genreInstances);
        // if (genreInstances.length !== genre.length) {
        //     return res.status(400).json({ success: false, message: 'Al menos uno de los geéneros especificados no existe' });
        // }

        await game.addGenres(genreInstances);

        return res.status(201).json({ success: true, data: game });
    } catch (error) {
        console.error('Error during creating Videogame:', error);
        console.error('Error details:', error.stack || error);

        return res.status(500).json({ success: false, error: 'Error during creating Videogame' });
    }



}

module.exports = postGame
