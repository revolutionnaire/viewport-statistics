const express = require('express');
const router = express.Router();

const homeController = (req, res) => {
  res.render('home', { pageTitle: 'Home' });
};

module.exports = homeController;
