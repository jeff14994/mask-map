/* eslint-disable no-undef */
// Create a map object
// Set up the longitude and latitude
// Set up zoom size
// var map = L.map('map', {
//     center: [ 24.144, 120.6844],
//     zoom: 16
// });
// eslint-disable-next-line no-undef
const map = L.map('map', {
  center: [22.604799, 120.2976256],
  zoom: 16,
});
// Set up Layer
// eslint-disable-next-line no-undef
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const markers = new L.MarkerClusterGroup().addTo(map);

const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
xhr.send();
xhr.onload = () => {
  const data = JSON.parse(xhr.responseText).features;
  // console.log(data);
  for (let i = 0; data.length > i; i += 1) {
    markers.addLayer(
      L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],
        { icon: greenIcon }).bindPopup(data[i].properties.name),
    );
    // add more markers here...
    // L.marker().addTo(map)
    //   )
  }
  map.addLayer(markers);
};
