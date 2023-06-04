const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController');
const captureController = require('./controllers/captureController');
const statisticsController = require('./controllers/statisticsController');

// Mount the routers
router.get('/', homeController);
router.post('/capture', captureController);
router.get('/statistics', statisticsController);

module.exports = router;
