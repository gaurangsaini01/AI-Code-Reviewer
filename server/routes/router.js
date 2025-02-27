const express = require("express");
const router = express.Router();
const getResponse = require('../controllers/aicontroller')

router.post('/review-code',getResponse);

module.exports = router;