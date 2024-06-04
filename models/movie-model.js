const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
});

movieSchema.pre("remove", async function (next) {
  try {
    await Review.deleteMany({ movieId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
