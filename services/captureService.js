const DataCollectionModel = require('../models/DataCollectionModel');

const saveViewportData = async (width, height, deviceType) => {
  const viewportDataCollection = new DataCollectionModel('viewportData');

  // Validate inputs
  if (!width || !height || isNaN(width) || isNaN(height)) {
    throw new Error('Invalid width or height');
  }

  const data = {
    width: parseInt(width),
    height: parseInt(height),
    deviceType,
    timestamp: new Date().toISOString(),
  };

  try {
    await viewportDataCollection.addViewportData(data);
    console.log('Viewport data captured and stored successfully');
  } catch (error) {
    console.error('Error storing viewport data:', error);
    throw error;
  }
};

module.exports = { saveViewportData };
