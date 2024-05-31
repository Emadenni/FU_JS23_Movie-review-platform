const express = require("express");
const movieController = require("../controllers/movie.controller");
const { auth } = require("../middlewares/auth");
const { authorizeAdmin } = require("../middlewares/adminAuth");
    const router = express.Router();

    router.post("/", auth, authorizeAdmin,   movieController.addMovie);

    module.exports = router;