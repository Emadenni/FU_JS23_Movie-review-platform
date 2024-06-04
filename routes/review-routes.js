const express = require("express");
const reviewController = require("../controllers/review-controller");
const router = express.Router();
const validateFields = require("../middlewares/validationFields");
const { auth } = require("../middlewares/auth");
const { isAuthor} = require("../middlewares/isAuthor")

router.post("/", auth, validateFields(reviewController.requiredCreateReviewFields), reviewController.createReview);
router.put("/:id",  auth,  isAuthor, validateFields(reviewController.requiredUpdateReviewFields),  reviewController.updateReview);
router.delete("/:id", auth, isAuthor, reviewController.deleteReview)
router.delete("/:id", auth, reviewController.deleteReview)
router.delete("/",auth, reviewController.clearReviews ) //testing use
router.get("/",auth, reviewController.getAllReviews ) 
module.exports = router;
