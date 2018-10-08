const router = require("express").Router();
const searchController = require("../controllers/searchController");
const profileController = require("../controllers/profileController");

//matches with "/api/search"

router.route("/search").post(searchController.search);

router.route("/profile").post(profileController.profile);

module.exports = router;
