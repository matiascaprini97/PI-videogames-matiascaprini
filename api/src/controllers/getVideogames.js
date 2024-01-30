//Obtiene un arreglo de objetos, donde cada objeto
// es un videojuego con su información.
const { Videogame, Genre } = require("../db.js");
const axios = require("axios");


const apiUrl = "https://api.rawg.io/api/games";
const apiKey = "9350cd30f5af4d8392270aa555d4df37";

const getVideogames = async (req, res) => {
    try {
        let allGames = [];
        let currentPage = 1;

        const videogameFromDB = await Videogame.findAll({
            include: [
                {
                    model: Genre,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        console.log("Console de prueba", videogameFromDB)
        const formattedGamesFromDB = videogameFromDB.map((games) => ({
            ...games.toJSON(),
            genres: games.Genres.map((genre) => genre.name),
            api: false
        }));
        console.log("Games from DB:", formattedGamesFromDB);

        while (allGames.length < 101) {


            // Realizar la solicitud GET a la API RAWG utilizando Axios
            const response = await axios.get(apiUrl, {
                params: {
                    key: apiKey,
                    page: currentPage,
                },
            });

            const { results } = response.data
            const juegos = results
            const apiGames = await Promise.all(
                juegos.map(async (juego) => {
                    const { id, name, background_image, rating, parent_platforms, genres } = juego;
                    const platforms = parent_platforms.map((platform) => platform.name)
                    const juegosGenres = genres.map((genre) => genre.name);

                    const filtroDB = formattedGamesFromDB.find((j) => j.id === id)

                    if (!filtroDB) {
                        return {
                            id,
                            name,
                            rating,
                            platforms,
                            genres: juegosGenres,
                            image: background_image,
                            api: true
                        }
                    } else {
                        return null;
                    }
                }))

            const filteredGames = apiGames.filter((p) => p !== null);
            console.log(apiGames)
            // Agregar los juegos de la página actual a la lista
            allGames = allGames.concat(filteredGames);

            // Verificar si hay más páginas
            if (response.data.next) {
                currentPage++;
            } else {
                // No hay más páginas, terminar el bucle
                break;
            }
        }


        // Enviar la lista completa de juegos como respuesta
        const gamesFull = [...formattedGamesFromDB, ...allGames];
        res.status(200).json(gamesFull);
    } catch (error) {
        console.error('Error al obtener la lista de juegos', error);
        res.status(500).send('Error interno del servidor');

    };
};

module.exports = getVideogames;

// const apiPokemonDetails = await Promise.all(
//     apiPokemons.map(async (apiPokemon) => {
//       const { data } = await axios(apiPokemon.url);
//       const { id, name, sprites, stats, height, weight, types } = data;
//       const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
//       const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
//       const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
//       const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
//       const pokemonTypes = types.map((type) => type.type.name);
//       const image = sprites.other.dream_world.front_default;