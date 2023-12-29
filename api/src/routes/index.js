const { Router } = require('express');



const router = Router();

router.get("/videogames", getCharById);
router.get("/videogames/:id", getCharById);
router.get("/videogames/name?=", getCharById);
router.post("/videogames", getCharById);
router.get("/genres", getCharById);


module.exports = router;
