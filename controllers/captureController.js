const captureService = require('../services/captureService');

const captureController = (req, res) => {
  const { width, height } = req.body;
  const userAgent = req.headers['user-agent'];

  // Check if cookies exist
  if (!req.cookies.viewportDataSaved) {
    captureService.saveViewportData(width, height, userAgent)
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
  } else {
    res.send('Viewport data already stored in the database.');
  }
};

module.exports = captureController;
