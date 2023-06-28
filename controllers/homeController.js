const express = require('express');
const router = express.Router();

const homeController = (req, res) => {
  res.render('homeView', { pageTitle: 'Viewport' });
};

module.exports = homeController;
