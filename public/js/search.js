// // New script to handle the "no listings found" message
//   document.addEventListener('DOMContentLoaded', () => {
//     const listingContainer = document.getElementById('listing-container');
//     const noListingsMessage = document.getElementById('no-listings-message');
    
//     // Check if there are any listings
//     if (listingContainer.children.length === 0) {
//       noListingsMessage.style.display = 'block';
//     } else {
//       noListingsMessage.style.display = 'none';
//     }
//   });


    // Get the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    // Get all the filter elements
    let listingContainer = document.getElementById('listing-container');
    let allListingCards = document.querySelectorAll(".listing-card");
    let noListingsMessage = document.getElementById('no-listings-message');
    
    // If a search query exists, assume it's a search result
    if (searchQuery) {
      if (allListingCards.length === 0) {
        // Show a search-specific message
        noListingsMessage.innerText = "No listings found for your search.";
        noListingsMessage.style.display = 'block';
      }
    }
