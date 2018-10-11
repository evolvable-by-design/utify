const router = require("express").Router();
const searchController = require("../controllers/searchController");
const profileController = require("../controllers/profileController");
const path = require('path')
const YAML = require('yamljs')
const { withAuth } = require("../utils/authentication.utils")

const apiDocumentationV2WithoutDefaultValues = YAML.load(path.join(__dirname, '../openapi-v2.yaml'))

router.route("/documentation").get(withAuth((req, res) => {
  const userid = req.user.id
  const userAdaptedDocumentation = JSON.parse(
    JSON.stringify(apiDocumentationV2WithoutDefaultValues)
      .replace(new RegExp('\\$context.userid', 'g'), userid)
    )

  res.status(200).json(userAdaptedDocumentation)
}))

const libraryController = require("../controllers/libraryController");
const libraryResultsController = require("../controllers/libraryResultsController");
//matches with "/api/search"

router.route("/search").post(searchController.search);

router.route("/profile").post(profileController.profile);

router.route("/library").post(libraryController.saveToLibrary);

router.route("/libraryResults").post(libraryResultsController.showResults);

module.exports = router;
