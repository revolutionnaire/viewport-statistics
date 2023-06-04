const express = require('express');
const router = express.Router();
const serviceAccount = require('./firebase-credentials.json');
const homeService = require('./services/homeService');
const captureService = require('./services/captureService');
const statisticsService = require('./services/statisticsService');

// Mount the service routers
router.get('/', homeService);
router.post('/capture', (res, req) => captureService(res, req));
router.get('/statistics', (res, req) => statisticsService(res, req));

module.exports = router;
