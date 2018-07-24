const express = require("express");
const router = express.Router();
const helpers = require("../helpers/wines");

router.route("/")
.get(helpers.getWines)
.post(helpers.createWine);

router.route("/:wineid")
.get(helpers.getWine)
.put(helpers.updateWine)
.delete(helpers.deleteWine);


module.exports = router;
