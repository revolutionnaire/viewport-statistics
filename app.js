const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

// Initialize Express.js
const app = express();

// Cooking parsing middleware
app.use(cookieParser());

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use('/', routes);

// Set the views directory
app.set('views', `${__dirname}/views`);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Use the public folder to store assets
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
