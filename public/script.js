/* eslint-disable no-undef */
// Create a map object
// Set up the longitude and latitude
// Set up zoom size

// Ask user's location
const map = L.map('map')
  .locate({
    setView: true,
    maxZoom: 16,
  });
// eslint-disable-next-line no-undef
// const map = L.map('map', {
//   center: [22.604799, 120.2976256],
//   zoom: 16,
// });
// Set up Layer
// eslint-disable-next-line no-undef
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// The style of the current location icon
const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// The style of the store's icon
const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Pinpoint user's current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    latit = position.coords.latitude;
    longit = position.coords.longitude;
    // this is just a marker placed in that position
    // Use .openPopup() to open the popup immediately;
    const currentLocationMarker = L.marker(
      [latit, longit],
      { icon: redIcon },
    );
    currentLocationMarker
      .addTo(map)
      .bindPopup('<h2>Current Location!</h2>')
      .openPopup();
    // Add a circle in the map (to show the distance)
    const circle = L.circle([latit, longit], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    });
    circle.addTo(map).bindPopup('<h3>距離約<strong>523.30公尺</strong></h3>');
    const circleSmall = L.circle([latit, longit], {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 0.5,
      radius: 200,
    });
    circleSmall.addTo(map).bindPopup('<h3><strong>距離約222.66公尺</strong></h3>');
    // move the map to have the location in its center
    map.panTo(new L.LatLng(latit, longit));
  });
}

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
        { icon: greenIcon }).bindPopup(`<h1>${data[i].properties.name}</h1><p>成人口罩：${data[i].properties.mask_adult}個</p><p>兒童口罩：${data[i].properties.mask_child}個</p>`),
    );
    // add more markers here...
    // L.marker().addTo(map)
    //   )
  }
  map.addLayer(markers);
};
// const popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent(`經緯度座標：${e.latlng.toString()}`)
//     .openOn(map);
//     console.log(e.latlng.lat);
//     console.log(e.latlng.lng);
// }
// map.on('click', onMapClick);

// function onMapClick(e) {
//   alert("經緯度座標：" + e.latlng);
// }
// map.on('click', onMapClick);

// Get location
// function geoFindMe() {
//   const status = document.querySelector('#status');
//   const mapLink = document.querySelector('#map-link');

//   mapLink.href = '';
//   mapLink.textContent = '';

//   function success(position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     // console.log(latitude, longitude);

//     status.textContent = '';
//     mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//     mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//     return (latitude, longitude);
//   }

//   function error() {
//     status.textContent = 'Unable to retrieve your location';
//   }

//   if (!navigator.geolocation) {
//     status.textContent = 'Geolocation is not supported by your browser';
//   } else {
//     status.textContent = 'Locating…';
//     navigator.geolocation.getCurrentPosition(success, error);
//   }
// }

// document.querySelector('#find-me').addEventListener('click', geoFindMe);
// geoFindMe();
