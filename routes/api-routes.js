const router = require("express").Router();
const searchController = require("../controllers/searchController");
const profileController = require("../controllers/profileController");
const libraryController = require("../controllers/libraryController");
const libraryResultsController = require("../controllers/libraryResultsController");
//matches with "/api/search"

router.route("/search").post(searchController.search);

router.route("/profile").post(profileController.profile);

router.route("/library").post(libraryController.saveToLibrary);

router.route("/libraryResults").post(libraryResultsController.showResults);

module.exports = router;
