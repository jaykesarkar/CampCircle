const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

// Mongoose Connection //
mongoose.connect("mongodb://localhost:27017/CampThrill", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seed = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 10; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 1500) + 10;
		const camp = new Campground({
			author: "6342837b9f3c69f73a9fc98e",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			// image: "https://source.unsplash.com/random/900*700/?camp",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aspernatur incidunt itaque vitae amet ab cupiditate ea optio similique asperiores culpa, error, inventore numquam cumque! Nulla earum iste dicta soluta.",
			price,
			images: [
				{
					url: "https://res.cloudinary.com/dqwsyopvx/image/upload/v1665310744/CampTrill/rdui0pb40c6kpoqnvjk0.jpg",
					filename: "CampTrill/rdui0pb40c6kpoqnvjk0",
				},
				{
					url: "https://res.cloudinary.com/dqwsyopvx/image/upload/v1665310747/CampTrill/kahcg4bc01jafe5rva9j.jpg",
					filename: "CampTrill/kahcg4bc01jafe5rva9j",
				},
			],
		});
		await camp.save();
	}
};

// To Close Database //
seed().then(() => {
	mongoose.connection.close();
});
