const express = require('express');
const router = express.Router();

const homeService = (req, res) => {
  const pageTitle = 'Home';
  res.render('home', { pageTitle });
};

module.exports = homeService;
