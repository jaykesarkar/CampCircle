const express = require("express");
const router = express.Router({ mergeParams: true });
const AsyncWrapper = require("../utilities/Async Wrapper");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");
// const WrapperFromNpm = require("express-async-wrapper");
// const ExpressError = require("../utilities/Express Error");
// const { reviewSchema } = require("../SchemaValidateJoi");
// const Campground = require("../models/campground");
// const Review = require("../models/review");

// Reviews Route //
router.post("/", isLoggedIn, validateReview, AsyncWrapper(reviews.postReview));

router.delete(
	"/:reviewId",
	isLoggedIn,
	isReviewAuthor,
	AsyncWrapper(reviews.deleteReview)
);

module.exports = router;
