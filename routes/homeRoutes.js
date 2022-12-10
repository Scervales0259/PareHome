const express = require('express');
const router = express.Router();
const homeController  = require('../controller/homeController');

// Home Page
router.get('/', homeController.home);
 // Login Page
router.get('/login', homeController.login);
 // Sign Up Page
router.get('/signup', homeController.signup);
 // Properties Page
router.get('/properties', homeController.properties);
// Logout
router.get("/logout", homeController.logout);
// Profile Page
router.get("/profile/:id", homeController.profile);

module.exports = router;

