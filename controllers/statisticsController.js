const statisticsService = require('../services/statisticsService');

const statisticsController = async (req, res) => {
  try {
    const averageViewport = await statisticsService.calculateAverageViewport();
    res.render('statistics', { averageViewport, pageTitle: 'Statistics' });
  } catch (error) {
    console.error('Error retrieving statistics:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = statisticsController;
