const viewportDataCollectionModel = require('../models/viewportDataCollectionModel');

const calculateAverageViewport = async () => {
  const viewportDataCollection = new viewportDataCollectionModel();

  const allViewportData = await viewportDataCollection.getAllViewportData();

  let desktopViewportCount = 0;
  let mobileViewportCount = 0;
  let sumDesktopWidth = 0;
  let sumDesktopHeight = 0;
  let sumMobileWidth = 0;
  let sumMobileHeight = 0;

  allViewportData.forEach((data) => {
    const width = Number(data.width);
    const height = Number(data.height);
    const deviceType = data.deviceType;

    if (deviceType === 'Desktop') {
      desktopViewportCount++;
      sumDesktopWidth += width;
      sumDesktopHeight += height;
    } else if (deviceType === 'Mobile') {
      mobileViewportCount++;
      sumMobileWidth += width;
      sumMobileHeight += height;
    }
  });

  const averageDesktopViewport = {
    size: `${Math.round(sumDesktopWidth / desktopViewportCount)}x${Math.round(sumDesktopHeight / desktopViewportCount)}`,
    count: desktopViewportCount,
  };

  const averageMobileViewport = {
    size: `${Math.round(sumMobileWidth / mobileViewportCount)}x${Math.round(sumMobileHeight / mobileViewportCount)}`,
    count: mobileViewportCount,
  };

  return {
    desktop: averageDesktopViewport,
    mobile: averageMobileViewport,
  };
};

module.exports = { calculateAverageViewport };
