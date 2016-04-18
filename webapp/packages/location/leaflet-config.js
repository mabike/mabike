/* global LeafletConfig, L */
/* jshint -W020 */

LeafletConfig = {};

var locationSettings = {
  "defaultZoom": 14,
  "locationNotFoundZoom": 5,
  "defaultMapCenter": {
    "latitude": 50.37,
    "longitude": 9.73
  },
  "providers": {
    "mapbox": {
      "accessToken": "pk.eyJ1IjoiYmlrZWJ1enoiLCJhIjoiY2luNXZrdGw2MDBzcnc4bHl6Y3M2dWxwcyJ9.olTCkAGeIB0Gvx6toKJ40Q",
      "street": "bikebuzz.pn9enh6k",
      "outdoors": "bikebuzz.pn9ehjcc"
    }
  }
};
var mapProviders = locationSettings.providers || {};
var defaultIconImagePath = '/packages/bevanhunt_leaflet/images';
var customIconImagePath = '/packages/mabike_location/images';

/*
 * Maps selectable by the user
 */
LeafletConfig.tileMaps = [{
  key: 'location.provider.mapboxOutdoors',
  provider: 'MapBox',
  options: {
    id: (mapProviders.mapbox || {}).outdoors,
    accessToken: (mapProviders.mapbox || {}).accessToken
  }
}, {
  key: 'location.provider.thunderforestOpenCycleMap',
  provider: 'Thunderforest.OpenCycleMap'
}, {
  key: 'location.provider.thunderforestOutdoors',
  provider: 'Thunderforest.Outdoors'
}];

/*
 * Parameters
 */
LeafletConfig.defaultZoom = locationSettings.defaultZoom || 15;
LeafletConfig.locationNotFoundZoom = locationSettings.locationNotFoundZoom || 5;
LeafletConfig.defaultMapCenter = locationSettings.defaultMapCenter || {
  // Center of Germany
  latitude: 50.37,
  longitude: 9.73
};

/*
 * Marker icons
 */
L.Icon.Default.imagePath = defaultIconImagePath;
LeafletConfig.primaryMarker = L.icon({
  iconUrl: customIconImagePath + '/primary-marker.png',
  iconRetinaUrl: customIconImagePath + '/primary-marker@2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [-1, -34],
  shadowUrl: customIconImagePath + '/primary-marker-shadow.png',
  //shadowRetinaUrl: 'my-icon-shadow@2x.png',
  shadowSize: [41, 41]
    //shadowAnchor: [22, 94]
});
LeafletConfig.secondaryMarker = L.icon({
  iconUrl: customIconImagePath + '/secondary-marker.png',
  iconRetinaUrl: customIconImagePath + '/secondary-marker@2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [-1, -34],
  shadowUrl: customIconImagePath + '/secondary-marker-shadow.png',
  //shadowRetinaUrl: 'my-icon-shadow@2x.png',
  shadowSize: [41, 41]
    //shadowAnchor: [22, 94]
});
