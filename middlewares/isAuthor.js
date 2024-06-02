const Review = require("../models/review-model");

const isAuthor = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).send("Review not found");
    }

    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).send("Access denied. You are not the author of this review.");
    }

    console.log(review.userId);

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { isAuthor };
