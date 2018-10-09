const router = require("express").Router();
const searchController = require("../controllers/searchController");
const profileController = require("../controllers/profileController");
const libraryController = require("../controllers/libraryController");
//matches with "/api/search"

router.route("/search").post(searchController.search);

router.route("/profile").post(profileController.profile);

router.route("/library").post(libraryController.saveToLibrary);

module.exports = router;
