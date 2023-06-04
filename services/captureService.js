const db = require('../firebase-config');

const captureViewportData = (width, height, userAgent) => {
  return new Promise((resolve, reject) => {
    const deviceType = getDeviceType(userAgent);

    if (!width || !height) {
      reject(new Error('Invalid width or height'));
      return;
    }

    const data = {
      width: parseInt(width),
      height: parseInt(height),
      deviceType,
      timestamp: new Date().toISOString(),
    };

    db.collection('viewportData')
      .add(data)
      .then(() => {
        console.log('Viewport data captured and stored successfully');
        resolve();
      })
      .catch((error) => {
        console.error('Error storing viewport data:', error);
        reject(error);
      });
  });
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

module.exports = { captureViewportData };
