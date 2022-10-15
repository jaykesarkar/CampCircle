const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");

// All Campgrounds Index Page//
module.exports.index = async (req, res) => {
	const campgrounds = await Campground.find({});
	if (!campgrounds) {
		req.flash("error", "Cannot find the campground");
		res.redirect("/campgrounds");
	}
	res.render("campgrounds/index", { campgrounds });
};

// Create New Campgrounds //
module.exports.renderNewForm = (req, res) => {
	res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
	const newCampData = req.body.campground;
	const campgrounds = new Campground(newCampData);
	campgrounds.images = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	campgrounds.author = req.user._id;
	await campgrounds.save();
	req.flash("success", "Successfully created campground");
	res.redirect(`/campgrounds/${campgrounds._id}`);
};

// Show/View Campgrounds //
module.exports.showCampground = async (req, res) => {
	const id = req.params.id;
	const campgrounds = await Campground.findById(id)
		.populate({
			path: "review",
			populate: {
				path: "author",
			},
		})
		.populate("author");
	if (!campgrounds) {
		req.flash("error", "Cannot find the campground");
		res.redirect("/campgrounds");
	}
	res.render("campgrounds/show", { campgrounds });
};

// Edit Campground //
module.exports.editCampground = async (req, res) => {
	const campgrounds = await Campground.findById(req.params.id);
	if (!campgrounds) {
		req.flash("error", "Cannot find the campground");
		res.redirect("/campgrounds");
	}
	res.render("campgrounds/edit", { campgrounds });
};

// Update Campground //
module.exports.updateCampground = async (req, res) => {
	const { id } = req.params;
	const campgrounds = await Campground.findByIdAndUpdate(
		id,
		{ ...req.body.campground },
		{
			runValidators: true,
			new: true,
		}
	);
	const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
	campgrounds.images.push(...imgs);
	if (req.body.deleteImages) {
		for (let filename of req.body.deleteImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await campgrounds.updateOne({
			$pull: { images: { filename: { $in: req.body.deleteImages } } },
		});
	}
	await campgrounds.save();
	req.flash("success", "Successfully updated campground");
	res.redirect(`/campgrounds/${campgrounds._id}`);
};

// Delete Campground //
module.exports.deleteCampground = async (req, res) => {
	const { id } = req.params;
	const campgrounds = await Campground.findByIdAndDelete(id);
	req.flash("success", "Successfully deleted campground");
	res.redirect("/campgrounds");
};
