const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/main.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/healthcheck', main_controller.healthcheck);

module.exports = router;
