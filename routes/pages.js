const router = require('express').Router();

// Controllers
const PagesController = require('../controllers/pagesController');

// Create routes
router.get('/', PagesController.show)
router.get('/about', PagesController.show)
router.get('/contact', PagesController.show)

module.exports = router;