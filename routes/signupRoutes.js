const express = require('express');
const router = express.Router();
const signupController  = require('../controller/signupController');
const imageUploader = require('../controller/imageUploader');

// Submit Sign Up
router.post('/signup_submit', imageUploader.upload.array('profilePicture'), 
                              signupController.setImagePath(imageUploader.imagePath),
                              signupController.submitReg);

module.exports = router;