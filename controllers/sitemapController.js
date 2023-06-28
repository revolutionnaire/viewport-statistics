const { SitemapStream, streamToPromise } = require('sitemap');

const generateSitemap = async (routes, req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const baseUrl = `${protocol}://${host}`;

    const smStream = new SitemapStream({ hostname: baseUrl });

    // Add routes to the sitemap
    routes.forEach(route => {
      smStream.write({ url: route.path, changefreq: route.changefreq, priority: route.priority });
    });

    // Add more routes as needed

    smStream.end();

    const sitemapXml = await streamToPromise(smStream);

    res.header('Content-Type', 'application/xml');
    res.send(sitemapXml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
};

module.exports = { generateSitemap };
