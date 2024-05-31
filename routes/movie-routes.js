const express = require("express");
const movieController = require("../controllers/movie.controller");
const { auth } = require("../middlewares/auth");
const { authorizeAdmin } = require("../middlewares/adminAuth");
const router = express.Router();

router.post("/", auth, authorizeAdmin, movieController.addMovie);
router.put("/:id", auth, authorizeAdmin, movieController.updateMovie);
router.delete("/:id", auth, authorizeAdmin, movieController.deleteMovie);
router.get("/:id", auth, movieController.getMovieById);

module.exports = router;
