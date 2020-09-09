const router = require("express").Router();
const searchController = require("../controllers/searchController");
const path = require('path')
const YAML = require('yamljs')

const apiDocumentation = YAML.load(path.join(__dirname, '../openapi-v1.yaml'))
router.route("/documentation").get((_, res) => res.status(200).json(apiDocumentation))

//matches with "/api/search"

router.route("/search").post(searchController.search);

module.exports = router;
