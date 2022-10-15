const User = require("../models/user");

// SignUp Page //
module.exports.renderSignUp = (req, res) => {
	res.render("user/signUp");
};

module.exports.SignUp = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const authcheck = new User({ email, username });
		const registeredUser = await User.register(authcheck, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash("success", "You are now Signed In");
			res.redirect("/campgrounds");
		});
		// res.send(result);
	} catch (error) {
		req.flash("error", error.message);
		res.redirect("/signUp");
	}
};

// Login Page //
module.exports.renderLogin = (req, res) => {
	res.render("user/login");
};

module.exports.Login = (req, res) => {
	req.flash("success", "welcome back");
	const redirectUrl = req.session.returnTo || "/campgrounds";
	res.redirect(redirectUrl);
};

// Logout //
module.exports.Logout = (req, res) => {
	req.logout((err) => {
		if (err) return next(err);
	});
	req.flash("success", "Successfully Logged Out");
	res.redirect("/campgrounds");
};
