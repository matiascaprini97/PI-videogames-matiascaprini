const { Router } = require('express');
const getVideogames = require('../controllers/getVideogames');
const getGameById = require('../controllers/getGameById');
const getGameByName = require("../controllers/getGameByName");
const postGame = require('../controllers/postGame');
const getGenres = require('../controllers/getGenres');

const router = Router();

router.get("/videogames", getVideogames);
router.get("/videogames/:id", getGameById);
router.get("/videogames/name", getGameByName);
router.post("/videogames", postGame);
router.get("/genres", getGenres);


module.exports = router;
