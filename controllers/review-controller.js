const e = require("express");
const Review = require("../models/review-model");
const requiredCreateReviewFields = ["movieId", "userId", "rating", "comment"];
const requiredUpdateReviewFields = ["rating", "comment"];

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

exports.updateReview = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["rating", "comment"];
  const isValidKeys = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidKeys) {
    return res.status(400).send("Invalid update fields");
  }

  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send("Review not found");
    }

    updates.forEach((update) => (review[update] = req.body[update]));
    review.modifiedAt = Date.now();
    await review.save();
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send("Review not found");
    }
    res.status(200).send("Review deleted succesfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send("Review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) {
      return res.status(404).send("No reviews found");
    }

    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.requiredCreateReviewFields = requiredCreateReviewFields;
module.exports.requiredUpdateReviewFields = requiredUpdateReviewFields;
