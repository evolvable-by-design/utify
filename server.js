const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./routes");
const searchRoutes = require("./routes/api-routes");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3001;

var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};

app.use(cors(corsOption));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
  })
);

//inititialize passport
app.use(passport.initialize());
app.use(passport.session());

// Define middleware here
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use("/api/v1/", routes);
app.use("/api", searchRoutes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/utify");

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT} !`);
});
