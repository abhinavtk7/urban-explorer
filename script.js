// Initialize map
var map = L.map('map').setView([20.5937, 78.9629], 5); // India center

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Click to add marker
map.on('click', function(e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`)
    .openPopup();
});

// Load GeoJSON data
fetch('data/locations.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name || "Unknown");
      }
    }).addTo(map);
  });
