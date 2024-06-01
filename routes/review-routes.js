const express = require("express");
const reviewController = require("../controllers/review-controller");
const router = express.Router();
const validateFields = require("../middlewares/validationFields");
const { auth } = require("../middlewares/auth");

router.post("/", validateFields(reviewController.requiredCreateReviewFields), auth, reviewController.createReview);

module.exports = router;
