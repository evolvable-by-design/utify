const router = require("express").Router();
const searchController = require("../controllers/searchController");
const profileController = require("../controllers/profileController");
const libraryController = require("../controllers/libraryController");
const libraryResultsController = require("../controllers/libraryResultsController");
const chipInsertController = require("../controllers/chipInsertController");
const chipDataController = require("../controllers/chipDataController");
//matches with "/api/search"

router.route("/search").post(searchController.search);

router.route("/profile").post(profileController.profile);

router.route("/library").post(libraryController.saveToLibrary);

router.route("/libraryResults").post(libraryResultsController.showResults);

router.route("/chipInsert").post(chipInsertController.chipInsert);

router.route("/chipData").post(chipDataController.chipData);

module.exports = router;
