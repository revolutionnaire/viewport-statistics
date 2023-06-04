const express = require('express');
const ViewportDataModel = require('../models/viewportDataModel');
const router = express.Router();

// Capture viewport data
const captureService = (req, res) => {
  const { width, height } = req.body;
  const userAgent = req.headers['user-agent'];
  const deviceType = getDeviceType(userAgent);

  if (!req.cookies.viewportDataSaved) {
    const viewportData = new ViewportDataModel(width, height, deviceType);
    const plainData = viewportData.toObject(); // Convert to plain JavaScript object

    viewportData
      .save(plainData) // Pass the plain object to the save method
      .then((docId) => {
        console.log('Viewport data captured and stored successfully');

        const time = new Date();
        const cookieExpiration = time.getTime() + 10 * 365 * 24 * 60 * 60 * 1000;

        res.cookie('viewportDataSaved', 'true', {
          expires: new Date(cookieExpiration),
          httpOnly: false,
        });

        res.send('Viewport data captured.');
      })
      .catch((error) => {
        console.error('Error storing viewport data:', error);
        res.status(500).send('Internal Server Error');
      });
  } else {
    res.send('Viewport data already stored in the database.');
  }
};

// Get device type
function getDeviceType(userAgent) {
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad'];
  const lowercaseUserAgent = userAgent.toLowerCase();

  if (mobileKeywords.some((keyword) => lowercaseUserAgent.includes(keyword))) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
}

module.exports = captureService;
