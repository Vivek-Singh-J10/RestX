const Listing = require('../models/listing');
const Review = require("../models/review.js");

module.exports.createRoutes=async (req, res) => {
    let listing=await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);  // Logged-in user info for debugging purposes.
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${listing._id}`);
    };

    
module.exports.destroyRoutes=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
};