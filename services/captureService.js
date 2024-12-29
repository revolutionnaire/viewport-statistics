const DataCollectionModel = require('../models/DataCollectionModel');

const saveViewportData = (width, height, deviceType) => {
  return new Promise((resolve, reject) => {
    const viewportDataCollection = new DataCollectionModel('viewportData');
    const deviceType = deviceType;

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

    viewportDataCollection.addViewportData(data)
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

module.exports = { saveViewportData };
