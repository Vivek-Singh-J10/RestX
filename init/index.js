const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");

async function initDB() {
    await mongoose.connect("mongodb://127.0.0.1:27017/restX");
    await Listing.deleteMany({});

    const listingsToInsert = initData.data.map((listing) => ({
        ...listing,
        owner: "687fbdb111545195a05db817"

    }));

    await Listing.insertMany(listingsToInsert);
    console.log("Data initialized successfully!");
}

initDB();