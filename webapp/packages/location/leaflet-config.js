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
      "accessToken": "pk.eyJ1Ijoid2FsZGdlaXN0IiwiYSI6ImNpaDF4YmJicjAwbDFycGx5MXh6YXA1MXYifQ.g4BAYHePkx3gsFWL_Db_5Q",
      "street": "waldgeist.o6853524",
      "outdoors": "waldgeist.o687h800"
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
  key: 'location.provider.thunderforestOutdoors',
  provider: 'Thunderforest.Outdoors'
}, {
  key: 'location.provider.thunderforestOpenCycleMap',
  provider: 'Thunderforest.OpenCycleMap'
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
