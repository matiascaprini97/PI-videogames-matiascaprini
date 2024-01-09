const { Router } = require('express');
const getVideogames = require('../controllers/getVideogames');
const getGameById = require('../controllers/getGameById');
const getGameByName = require('../controllers/getGameByName');
const postGame = require('../controllers/postGame');
const getGenres = require('../controllers/getGenres');

const router = Router();

router.get("/videogames", getVideogames);
router.get("/videogames/:id", getGameById);
router.post("/videogames", postGame);
router.get("/genres", getGenres);
router.get("/name", getGameByName);


module.exports = router;
