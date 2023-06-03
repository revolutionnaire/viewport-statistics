const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-credentials.json');
const homeService = require('./services/homeService');
const captureService = require('./services/captureService');
const statisticsService = require('./services/statisticsService');

// Configure Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Firestore setup
const db = admin.firestore();
const viewportDataCollection = db.collection('viewportData');

// Mount the service routers
router.get('/', homeService);
router.post('/capture', (res, req) => captureService(res, req, viewportDataCollection));
router.get('/statistics', (res, req) => statisticsService(res, req, viewportDataCollection));

module.exports = router;
