const express = require("express");
const reviewController = require("../controllers/review-controller");
const router = express.Router();
const validateFields = require("../middlewares/validationFields");
const { auth } = require("../middlewares/auth");
const { isAuthor} = require("../middlewares/isAuthor")

router.post("/", auth, validateFields(reviewController.requiredCreateReviewFields), reviewController.createReview);
router.put("/:id",  auth,  isAuthor, validateFields(reviewController.requiredUpdateReviewFields),  reviewController.updateReview);
module.exports = router;
