const Movie = require("../models/movie-model");

exports.addMovie = async (req, res) => {
  try {
    const { title, director, releaseYear, genre } = req.body;
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      return res.status(400).send("Movie already exists");
    }

    const movie = new Movie({ title, director, releaseYear, genre });
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};
