const express = require('express');
const router = express.Router();
const listingController  = require('../controller/listingController');

router.get('/listing-registration', listingController.listingRegistration);
router.get("/addListing", listingController.addListing);
router.get("/listingPage/:id", listingController.listingPage);
router.get("/deleteListing/:id", listingController.deleteListing);
// router.post("/uploadListing", listingController.uploadListing);
router.post("/submit-review/:id", listingController.submitReview);

module.exports = router;