const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const AsyncWrapper = require("../utilities/Async Wrapper");
var { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
// const { campgroundSchema } = require("../SchemaValidateJoi");
// const Campground = require("../models/campground");

// All Campgrounds Index Page//
router.get("/", AsyncWrapper(campgrounds.index));

// Create New Campgrounds //
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
	"/",
	isLoggedIn,
	upload.array("image"),
	validateCampground,
	AsyncWrapper(campgrounds.createCampground)
);

// Show/View Campgrounds //
router.get("/:id", isLoggedIn, AsyncWrapper(campgrounds.showCampground));

// Edit //
router.get(
	"/:id/edit",
	isLoggedIn,
	isAuthor,
	AsyncWrapper(campgrounds.editCampground)
);

router.put(
	"/:id",
	isLoggedIn,
	isAuthor,
	upload.array("image"),
	validateCampground,
	AsyncWrapper(campgrounds.updateCampground)
);

// Delete; //
router.delete(
	"/:id",
	isLoggedIn,
	isAuthor,
	AsyncWrapper(campgrounds.deleteCampground)
);

module.exports = router;
