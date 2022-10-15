const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.postReview = async (req, res) => {
	const campgrounds = await Campground.findById(req.params.id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	campgrounds.review.push(review);
	await review.save();
	await campgrounds.save();
	req.flash("success", "Successfully created review");
	res.redirect(`/campgrounds/${campgrounds._id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	req.flash("success", "Review Deleted!");
	res.redirect(`/campgrounds/${id}`);
};
