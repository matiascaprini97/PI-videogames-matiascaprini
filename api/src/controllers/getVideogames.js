//Obtiene un arreglo de objetos, donde cada objeto
// es un videojuego con su información.

const axios = require("axios");


const apiUrl = "https://api.rawg.io/api/games";
const apiKey = "9350cd30f5af4d8392270aa555d4df37";

const getVideogames = async (req, res) => {
    try {
        let allGames = [];
        let currentPage = 1;

        while (allGames.length < 101) {
            // Realizar la solicitud GET a la API RAWG utilizando Axios
            const response = await axios.get(apiUrl, {
                params: {
                    key: apiKey,
                    page: currentPage,
                },
            });

            // Agregar los juegos de la página actual a la lista
            allGames = allGames.concat(response.data.results);

            // Verificar si hay más páginas
            if (response.data.next) {
                currentPage++;
            } else {
                // No hay más páginas, terminar el bucle
                break;
            }
        }

        // Enviar la lista completa de juegos como respuesta
        res.json(allGames);
    } catch (error) {
        console.error('Error al obtener la lista de juegos', error);
        res.status(500).send('Error interno del servidor');

    };
};

module.exports = getVideogames;