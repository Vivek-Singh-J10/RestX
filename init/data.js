const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&w=1000&q=80",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beaches",
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2l0eSUyMGxvZnR8ZW58MHx8MHx8&w=1000&q=80",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Urban Voyage",
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin surrounded by nature trails and wildlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBjYWJpbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa with vineyards and rolling hills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHVzY2FueSUyMHZpbGxhfGVufDB8fDB8fHww&w=1000&q=80",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Castles",
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A perfect romantic escape!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJlZWhvdXNlfGVufDB8fDB8fHww&w=1000&q=80",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Camps",
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach and enjoy crystal-clear waters all day long.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2glMjBodXR8ZW58MHx8MHx8&w=1000&q=80",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beaches",
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking with a beautiful lake view from your porch.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGNhYmlufGVufDB8fDB8fHww&w=1000&q=80",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Plunges",
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views and modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVudGhvdXNlfGVufDB8fDB8fHww&w=1000&q=80",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Urban Voyage",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this luxury alpine chalet.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpfGVufDB8fDB8fHww&w=1000&q=80",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Arctic",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild with daily safaris and luxury tents.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FmYXJpJTIwbG9kZ2V8ZW58MHx8MHx8&w=1000&q=80",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Farms",
  },
];


module.exports = { data: sampleListings };
