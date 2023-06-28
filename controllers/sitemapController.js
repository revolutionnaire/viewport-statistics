const sitemapService = require('../services/sitemapService');

const sitemapController = async (routes, req, res) => {
  try {
    const sitemap = await sitemapService.generateSitemap(routes, req, res);
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
};

module.exports = sitemapController;
