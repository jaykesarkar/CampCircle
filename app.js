if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const EjsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utilities/Express Error");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const passportLocalStrategy = require("passport-local");
const user = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");

// Requiring Routes //
const CampgroundsRoutes = require("./routes/campgrounds");
const ReviewsRoutes = require("./routes/reviews");
const UserRoutes = require("./routes/user");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/CampThrill";

// Mongoose Connection //
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Mongoose Connection Error Handling //
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// Ejs View Engine & File Path //
app.engine("ejs", EjsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Parse String Id/Body Data to Integer //
// Middlewares //
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());

const secret = process.env.SECRET || "topSecret";

const store = new MongoStore({
	mongoUrl: dbUrl,
	secret,
	touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
	console.log("session store error", e);
});

// Session //
const sessionConfig = {
	store,
	name: "session",
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

// Flash //
app.use(session(sessionConfig));
app.use(flash());

// Passport //
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// Initializing Routes //
app.use("/", UserRoutes);
app.use("/campgrounds", CampgroundsRoutes);
app.use("/campgrounds/:id/reviews", ReviewsRoutes);

// Error Handling Express //
app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
	const { statuscode = 500 } = err;
	if (!err.message) err.message = "Something went wrong";
	res.status(statuscode).render("error", { err });
});

process.on("uncaughtException", (err) => {
	console.log(`Uncaught Exception: ${err.message}`);
	process.exit(1);
});

// Server //
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
