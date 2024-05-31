const express = require("express");
const movieController = require("../controllers/movie.controller");
const { auth } = require("../middlewares/auth");
const { authorizeAdmin } = require("../middlewares/adminAuth");
    const router = express.Router();

    router.post("/", auth, authorizeAdmin,   movieController.addMovie);
    router.put("/:id",auth,  authorizeAdmin,   movieController.updateMovie);

    module.exports = router;