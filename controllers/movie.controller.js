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

exports.updateMovie = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "director", "releaseYear", "genre"];
  const isValidKeys = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidKeys) {
    return res.status(400).send("Invalide update fields");
  }
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    updates.forEach(update=>movie[update] = req.body[update]);
    await movie.save();
    res.status(200).send(movie);

  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found")
    }

    res.status(200).send("Movie deleted succesfully")
  } catch (error) {
    res.status(500).send(error);
  }

}