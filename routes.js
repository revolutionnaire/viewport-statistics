const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController');
const captureController = require('./controllers/captureController');
const statisticsController = require('./controllers/statisticsController');
const sitemapController = require('./controllers/sitemapController');

// Define your app's routes
const routes = [
  { path: '/', method: 'GET', controller: homeController, changefreq: 'monthly', priority: 0.8 },
  { path: '/capture', method: 'POST', controller: captureController },
  { path: '/statistics', method: 'GET', controller: statisticsController, changefreq: 'monthly', priority: 0.5 }
];

// Generate the routes dynamically
routes.forEach(route => {
  if (route.method === 'GET')
    router.get(route.path, route.controller);
  else if (route.method === 'POST')
    router.post(route.path, route.controller);
});

// Handle sitemap route
router.get('/sitemap.xml', (req, res) => sitemapController(routes, req, res));

module.exports = { router, routes };
