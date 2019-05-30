/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

// Views path
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'pug');

// Routes
const routes = require('./routes.js');
app.use('/', routes);

// eslint-disable-next-line no-undef
const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${port}`));