const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other Firebase configuration options if needed
});

// Get a Firestore instance
const db = admin.firestore();

module.exports = db;
