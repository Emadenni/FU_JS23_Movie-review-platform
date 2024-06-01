const Review = require("../models/review-model");
const requiredCreateReviewFields = ["movieId", "userId", "rating", "comment"];

exports.createReview = async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;
    const review = new Review({ movieId, userId, rating, comment });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.requiredCreateReviewFields = requiredCreateReviewFields;