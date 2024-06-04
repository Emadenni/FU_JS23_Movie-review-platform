const express = require("express");
const movieController = require("../controllers/movie.controller");
const { auth } = require("../middlewares/auth");
const { authorizeAdmin } = require("../middlewares/adminAuth");
const validateFields = require("../middlewares/validationFields");

const router = express.Router();

router.post("/", auth, authorizeAdmin, validateFields(movieController.requiredMovieFields), movieController.addMovie);
router.put("/:id", auth, authorizeAdmin, movieController.updateMovie);
router.delete("/:id", auth, authorizeAdmin, movieController.deleteMovie);
router.get("/", auth, movieController.getAllMovies);
router.get("/:id/reviews", auth, movieController.getMovieReviews);
router.get('/:idOrRatings?', movieController.getMoviesOrRatings);
module.exports = router;
