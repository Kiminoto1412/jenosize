const express = require('express');

const router = express.Router();

const jenosizeController = require("../controllers/jenosizeController");


router.get("/placeSearch", jenosizeController.placeSearch);
router.post("/game24", jenosizeController.game24);

module.exports = router