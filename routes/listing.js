const express = require('express');
const router = express.Router({ mergeParams: true  });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing');
const {isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listings.js");

const multer  = require('multer')
const { cloudinary, storage } = require('../cloudConfig.js');
const upload = multer({ storage });
router
.route("/")//index and create post route
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createRoutes)
);
router.post('/:id/checkout',isLoggedIn,wrapAsync(listingController.checkout));
router.get('/:id/success', (req, res) => {
    res.redirect(`/listings/${req.params.id}`);
    req.flash('success', 'Payment successful!');
});
router.get('/new',
    isLoggedIn,(listingController.new));   
 //update route
router.route("/:id")
.get(wrapAsync(listingController.showRoutes))
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateRoutes))
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyRoutes));
   
router.get('/suggestions', wrapAsync(listingController.searchSuggestions));

// Edit Route
router.get('/:id/edit',
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editRoutes));

module.exports = router;