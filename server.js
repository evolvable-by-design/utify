const express = require("express");
const path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./routes");

const app = express();

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
