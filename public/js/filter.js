const filters = document.querySelectorAll(".filter");
const allListings = document.querySelectorAll(".listing-card");
const noListingsMessage = document.getElementById("no-listings-message");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        // Highlight selected filter
        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");

        const category = filter.dataset.category;

        let hasVisibleListings = false;

        allListings.forEach(listing => {
            // Hide all listings initially
            listing.style.display = "none";
            // Check if the listing's category matches the selected category
            if (listing.dataset.category === category) {
                listing.style.display = "block"; // Show matching listings
                hasVisibleListings = true;
            }
        });

        // Check if any listings were made visible and show/hide the message accordingly
        if (hasVisibleListings) {
            noListingsMessage.style.display = "none";
        } else {
            noListingsMessage.style.display = "block";
        }
    });
});

