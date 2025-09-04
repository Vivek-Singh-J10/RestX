const dotenv = require('dotenv');
dotenv.config(); 
const Listing = require("../models/listing");
 // The apikey is not needed here

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 

module.exports.index = async (req, res) => {
    let allListings;
    const { q } = req.query; 

    if (q) {
        const searchRegex = new RegExp(q, 'i');
        allListings = await Listing.find({
            $or: [
                // Ensure these field names (title, location) are correct
                { title: { $regex: searchRegex } },
                { location: { $regex: searchRegex } }
            ]
        });
    } else {
        allListings = await Listing.find({});
    }
  
    // Add this to your controller to see what is returned from the search
    console.log("Listings found:", allListings);
    res.render("listings/index.ejs", { allListings });
};
module.exports.searchSuggestions = async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
        return res.json([]);
    }

    const regex = new RegExp(searchQuery, 'i');
    const suggestions = await Listing.find({
        $or: [
            { location: { $regex: regex } },
            { country: { $regex: regex } }
        ]
    }).select('location country'); // Select only the fields needed for suggestions

    // Remove duplicates and send as JSON
    const uniqueSuggestions = [...new Set(suggestions.map(s => `${s.location}, ${s.country}`))];
    res.json(uniqueSuggestions);
};

module.exports.new = (req, res) => {
    res.render('listings/new.ejs');
};
module.exports.showRoutes = async (req, res, next) => {
    
   const successMsg = req.flash('success')[0]; 
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: { path: 'author', select: 'username' }
        })
        .populate('owner');

    console.log("Listing found:", listing); // Add this line

    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing, success: successMsg });
};
module.exports.checkout= async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).send('Listing not found');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr', // Use 'usd' or your currency
                    product_data: {
                        name: listing.title,
                    },
                    unit_amount: listing.price * 100, // Stripe expects the amount in cents (or the smallest currency unit)
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/listings/${id}/success`,
            cancel_url: `${req.protocol}://${req.get('host')}/listings/${id}`,
        });

        res.redirect(303, session.url);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred during checkout.');
    }
};


module.exports.createRoutes = async (req, res, next) => {
    try {
        // Retrieve image URL and filename from the uploaded file
        let url = req.file.path;
        let filename = req.file.filename;

        // Create a new Listing instance with data from the request body
        const data = new Listing(req.body.listing);
        data.owner = req.user._id;
        data.image = { url, filename };

        // Save the new listing to the database
        await data.save();

        // Flash a success message and redirect
        req.flash('success', 'Listing created successfully!');
        res.redirect("/listings");

    } catch (err) {
        // If an error occurs during the process, log it and pass it to the error handler
        console.error("Error creating listing:", err);
        next(err);
    }
};

module.exports.editRoutes = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    let previewImage = listing.image.url;
    previewImage = previewImage.replace("/upload", "/upload/w_300");

    res.render('listings/edit.ejs', { listing, previewImage });
};
module.exports.updateRoutes = async (req, res) => {
    let { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });

    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {
            url: url,
            filename: filename
        };
        await updatedListing.save();
        console.log(updatedListing.image);
    }
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyRoutes = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/listings');
};