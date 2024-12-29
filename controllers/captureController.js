const captureService = require('../services/captureService');

const captureController = (req, res) => {
  const { width, height } = req.body;
  const deviceType = getDeviceType(req.headers['user-agent']);

  // Check if it's a desktop or laptop
  if (deviceType == 'Desktop') {
    // Check if cookies exist
    if (!req.cookies.viewportDataSaved) {
      captureService.saveViewportData(width, height, deviceType)
        .then(() => {
          const time = new Date();
          const cookieExpiration = time.getTime() + 10 * 365 * 24 * 60 * 60 * 1000;

          res.cookie('viewportDataSaved', 'true', {
            expires: new Date(cookieExpiration),
            httpOnly: false,
          });

          res.send('Viewport data captured.');
        })
        .catch((error) => {
          console.error('Error capturing viewport data:', error);
          res.status(500).send('Internal Server Error');
        });
      }
      else {
        res.send('Viewport data already stored in the database.');
      }
  } else {
    res.send('We only capture desktops and laptops.');
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

module.exports = captureController;
