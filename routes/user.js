const express = require("express");
const router = express.Router();
const passport = require("passport");

const AsyncWrapper = require("../utilities/Async Wrapper");
const WrapperFromNpm = require("express-async-wrapper");
const ExpressError = require("../utilities/Express Error");
const { userSchema } = require("../SchemaValidateJoi");

const User = require("../models/user");
const users = require("../controllers/users");

// const LoginAuth = (req, res, next) => {
//     passport.authenticate("local", {
//         failureFlash: true,
//         failureRedirect: "/login",
//     });
//     next();
// })

// SignUp Page //
router.get("/signUp", users.renderSignUp);

router.post("/signUp", users.SignUp);

// Login Page //
router.get("/login", users.renderLogin);

router.post(
	"/login",
	passport.authenticate("local", {
		failureFlash: true,
		failureRedirect: "/login",
	}),
	users.Login
);

// Logout Route //
router.get("/logout", users.Logout);

module.exports = router;
