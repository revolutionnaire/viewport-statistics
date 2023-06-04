const ViewportDataCollectionModel = require('../models/viewportDataCollectionModel');

const statisticsService = (req, res) => {
  const viewportDataCollection = new ViewportDataCollectionModel();

  viewportDataCollection
    .getAllViewportData()
    .then(viewportData => {
      const averageViewport = calculateAverageViewport(viewportData);
      const pageTitle = 'Statistics';
      res.render('statistics', { averageViewport, pageTitle });
    })
    .catch(error => {
      console.error('Error retrieving viewport data:', error);
      res.status(500).send('Internal Server Error');
    });
};

// Helper function to calculate average dimensions
function calculateAverageViewport(data) {
  const desktopData = data.filter(item => item.deviceType === 'Desktop');
  const mobileData = data.filter(item => item.deviceType === 'Mobile');

  const desktopCount = desktopData.length;
  const mobileCount = mobileData.length;

  const totalDesktopWidth = desktopData.reduce((sum, item) => sum + parseInt(item.width), 0);
  const totalDesktopHeight = desktopData.reduce((sum, item) => sum + parseInt(item.height), 0);
  const totalMobileWidth = mobileData.reduce((sum, item) => sum + parseInt(item.width), 0);
  const totalMobileHeight = mobileData.reduce((sum, item) => sum + parseInt(item.height), 0);

  const averageDesktopWidth = desktopCount > 0 ? totalDesktopWidth / desktopCount : 0;
  const averageDesktopHeight = desktopCount > 0 ? totalDesktopHeight / desktopCount : 0;
  const averageMobileWidth = mobileCount > 0 ? totalMobileWidth / mobileCount : 0;
  const averageMobileHeight = mobileCount > 0 ? totalMobileHeight / mobileCount : 0;

  return {
    desktop: {
      size: `${Math.round(averageDesktopWidth)}x${Math.round(averageDesktopHeight)}`,
      count: desktopCount,
    },
    mobile: {
      size: `${Math.round(averageMobileWidth)}x${Math.round(averageMobileHeight)}`,
      count: mobileCount,
    },
  };
}

module.exports = statisticsService;
