const express = require('express');
const app = express();

// Import page routes
const pageRoutes = require('./routes/pages');

// Register Page Routes with our app
app.use('/', pageRoutes);

// Export changes
module.exports = app;