const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
require('./db/mongoose')
const app = express();
const passportSetup = require("./config/passport-setup");

const authRoutes = require("./routers/auth");
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
mongoose.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	const error = new Error("Route not found");
	error.status = 404;
	next(error);
});


app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log('Server is up on port ' + port);
})





