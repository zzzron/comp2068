/* eslint-disable no-console */
require('dotenv').config();

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true
}).catch(err => console.error(`ERROR: ${err}`));
// End Mongoose

const express = require('express');
const path = require('path');

const app = express();

// Adding cookies and aseesions support
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
app.use(cookieParser());
app.use(session({
    secret: (process.env.secret || 'boorakacha'),
    cookie: {
        maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.flash = res.locals.flash || {};
    res.locals.flash.success = req.flash('success') || null;
    res.locals.flash.error = req.flash('error') || null;

    next();
});

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// End Body 

// Views path
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/css', express.static('assets/stylesheets'));
app.use('/js', express.static('assets/javascripts'));
app.use('/images', express.static('assets/images'));

// Our authentication helper
const isAuthenticated = (req) => {
    return req.session && req.session.userId;
  };
  app.use((req, res, next) => {
    req.isAuthenticated = () => {
      if (!isAuthenticated(req)) {
        req.flash('error', `You are not permitted to do this action.`);
        res.redirect('/');
      }
    }
  
    res.locals.isAuthenticated = isAuthenticated(req);
    next();
  });
  // End of our authentication helper

// Routes
const routes = require('./routes.js');
app.use('/', routes);

// eslint-disable-next-line no-undef
const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${port}`));