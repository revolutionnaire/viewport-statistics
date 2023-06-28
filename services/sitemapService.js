const { SitemapStream, streamToPromise } = require('sitemap');

const generateSitemap = async (routes, req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  const baseUrl = `${protocol}://${host}`;

  const smStream = new SitemapStream({ hostname: baseUrl });

  // Add routes to the sitemap
  routes.forEach(route => {
    if (route.method != 'POST')
      smStream.write({ url: route.path, changefreq: route.changefreq, priority: route.priority });
  });

  // Add more routes as needed

  smStream.end();

  const xml = await streamToPromise(smStream);

  return xml;
}

module.exports = { generateSitemap };
