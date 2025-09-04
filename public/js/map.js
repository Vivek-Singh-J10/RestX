
  // const marker = new google.maps.Marker({color:"red"})
  // .setLngLat({ lat: 28.61, lng: 77.21 })
  // .addTo(map);
// const axios =require('axios');
// let map;
// async function initMap() {
//   // The map, centered at a default location
//   const { Map } = await google.maps.importLibrary("maps");
//   map = new Map(document.getElementById("map"), {
//     zoom: 12,
//     center: { lat: 28.6139, lng: 77.2090 }, // Example: New Delhi, India
//     mapId: "DEMO_MAP_ID",
//   });
//   // Now call your geocoding function
//   geocodeAddress("New Delhi, India");
// }
// async function geocodeAddress(address) {
//   const geocoder = new google.maps.Geocoder();
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   geocoder.geocode({ address: address }, (results, status) => {
//     if (status === "OK") {
//       const location = results[0].geometry.location;
//       map.setCenter(location);

//       // Add a marker at the geocoded location
//       const marker = new AdvancedMarkerElement({
//         map: map,
//         position: location,
//         title: address,
//       });
//     } else {
//       alert("Geocoding failed for the following reason: " + status);
//     }
//   });
// }

// // Call the initMap function to start the process
// initMap();