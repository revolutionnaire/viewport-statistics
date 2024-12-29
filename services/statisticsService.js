const DataCollectionModel = require('../models/DataCollectionModel');

const calculateAverageViewport = async () => {
  const viewportDataCollection = new DataCollectionModel('viewportData');

  const allViewportData = await viewportDataCollection.getAllViewportData();

  let desktopViewportCount = 0;
  let sumDesktopWidth = 0;
  let sumDesktopHeight = 0;

  const desktopWidths = [];
  const desktopHeights = [];

  allViewportData.forEach((data) => {
    const width = Number(data.width);
    const height = Number(data.height);
    const deviceType = data.deviceType;

    if (deviceType === 'Desktop') {
      desktopViewportCount++;
      sumDesktopWidth += width;
      sumDesktopHeight += height;
      desktopWidths.push(width);
      desktopHeights.push(height);
    }
  });

  const calculateConfidenceInterval = (dataArray, mean, sampleCount, confidenceLevel) => {
    // Step 1: Calculate the standard deviation
    const variance = dataArray.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / sampleCount;
    const standardDeviation = Math.sqrt(variance);

    // Step 2: Calculate the Standard Error of the Mean (SEM)
    const standardError = standardDeviation / Math.sqrt(sampleCount);

    // Step 3: Determine the Z-score for the given confidence level
    const zScore = confidenceLevel === 95 ? 1.96 : confidenceLevel === 99 ? 2.58 : 1.65; // Default: 90%

    // Step 4: Calculate the margin of error
    const marginOfError = zScore * standardError;

    // Step 5: Return the confidence interval
    return {
      lowerBound: mean - marginOfError,
      upperBound: mean + marginOfError,
    };
  };

  // Calculate averages
  const averageDesktopWidth = sumDesktopWidth / desktopViewportCount;
  const averageDesktopHeight = sumDesktopHeight / desktopViewportCount;

  // Calculate confidence intervals for desktop width and height
  const desktopWidthConfidence = calculateConfidenceInterval(desktopWidths, averageDesktopWidth, desktopViewportCount, 99);
  const desktopHeightConfidence = calculateConfidenceInterval(desktopHeights, averageDesktopHeight, desktopViewportCount, 99);

  const averageDesktopViewport = {
    size: `${desktopWidthConfidence.lowerBound.toFixed(2)}x${desktopHeightConfidence.lowerBound.toFixed(2)}`,
    count: desktopViewportCount,
  };

  return {
    desktop: averageDesktopViewport,
  }};

module.exports = { calculateAverageViewport };
