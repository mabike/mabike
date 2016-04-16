/* global L, LeafletConfig, PruneClusterForLeaflet, PruneCluster, ModalDialog */

const incidentsCollection = app.Collections.incidents;

var map; // Leaflet map object
var geocoder; // Geocoder to be used for reverse geocoding
var geocoderMarker; // Marker to be set on reverse geocoding
var selectedLocation; // Location the user has selected
var incidentMarkers = {}; // Hash map containing all Things that are shown on the map
var pruneCluster;

Template.locationPickLocation.onCreated(function() {
  var instance = this;
  instance.showConfirmButton = new ReactiveVar(false);
  instance.boundingBox = new ReactiveVar();
  instance.bikesInVicinity = new ReactiveVar(0);
  instance.bikesOnMap = new ReactiveVar(0);
});

Template.locationPickLocation.onDestroyed(function() {
  if (map) {
    map.clearAllEventListeners();
  }
  if (pruneCluster) {
    pruneCluster.RemoveMarkers();
  }
});

Template.locationPickLocation.onRendered(function() {
  var instance = this;
  showMap(instance);
  // Subscribe to all things inside the currently visible map
  instance.autorun(function() {
    var boundingBox = instance.boundingBox.get();
    if (!boundingBox) {
      return;
    }
    instance.subscribe('location:incidentsOnMap', boundingBox);
  });
  // Get all incidents inside the visible map
  instance.autorun(function() {
    const cursor = incidentsCollection.find({});
    instance.bikesOnMap.set(cursor.count());
    const incidents = cursor.fetch();
    //var onMarkerClickHandler = _.partial(onMarkerClick, instance);
    _.each(incidents, function(incident) {
      if (incidentMarkers[incident._id]) {
        // Thing has already been added to the map.
        return;
      }
      incidentMarkers[incident._id] = true;
      var coordinates = ((incident.location || {}).center || {}).coordinates;
      if (!coordinates) {
        return;
      }
      var marker = new PruneCluster.Marker(coordinates[1], coordinates[0]);
      marker.data.incident = incident;
      marker.data.popup = incident.title;
      pruneCluster.RegisterMarker(marker);
      /*
            var latlng = [coordinates[1], coordinates[0]];
            L.marker(latlng, {
              incident: incident
            }).on('click', onMarkerClickHandler).addTo(map).bindPopup(incident.title);
      */
    });
    pruneCluster.ProcessView();
  });
});

/**
 * Called if the user clicks on an existing Thing marker on the map
 */
var onMarkerClick = function(instance, event) {
  selectedLocation = event.target.options.incident;
  setUserMarker(instance);
};

/**
 * Highlights the location or marker the user clicked on
 */
var setUserMarker = function(instance) {
  if (geocoderMarker) {
    map.removeLayer(geocoderMarker);
  }
  var coordinates = selectedLocation.location.center.coordinates;
  var center = [coordinates[1], coordinates[0]];
  // console.dir(selectedLocation);
  geocoderMarker = L.marker(center, {
    icon: LeafletConfig.secondaryMarker
  }).bindPopup(selectedLocation.title).addTo(map).openPopup();
  instance.showConfirmButton.set(true);
};

/**
 * Finds the location for a given latitude/langitude and places a marker with its name on it
 * @param  {Object} options An object containing
 *                          latlng: The latitude/longitude of the location to reverse geocode
 */
var reverseGeocode = function(instance, options) {
  geocoder.options.geocoder.reverse(options.latlng, map.options.crs.scale(map.getZoom()), function(results) {
    var location = results[0];
    if (!location) {
      return;
    }
    var description = _.compact([
      (location.properties || {}).street, (location.properties || {}).city
    ]).join(', ');
    var locationDoc = {
      title: location.name,
      description: description,
      location: {
        bbox: {
          type: "Polygon",
          coordinates: getBoundingPolygon(location.bbox)
        },
        center: {
          type: 'Point',
          // coordinates: [location.center.lng, location.center.lat]
          coordinates: [options.latlng.lng, options.latlng.lat]
        }
      },
      data: {
        properties: location.properties
      },
      source: 'osm'
    };
    selectedLocation = locationDoc; //new AppMain.LocationThing(incidentDoc);
    setUserMarker(instance);
    ModalDialog.data.set({
      location: selectedLocation
    });
    ModalDialog.size.set('modal-lg');
    ModalDialog.template.set('dialogAddIncident');
    ModalDialog.show();
  });
};

/**
 * Converts a Leaflet bounding box into a GeoJSON bounding polygon for MongoDB
 */
var getBoundingPolygon = function(bbox) {
  var southWest = bbox._southWest;
  var northEast = bbox._northEast;
  var polygon = [
    [
      [southWest.lng, southWest.lat],
      [southWest.lng, northEast.lat],
      [northEast.lng, northEast.lat],
      [northEast.lng, southWest.lat],
      [southWest.lng, southWest.lat]
    ]
  ];
  return polygon;
};

/**
 * Shows the map
 */
var showMap = function(instance) {
  var layersInLayersControl = {};
  incidentMarkers = {};
  _.map(LeafletConfig.tileMaps, function(map) {
    map.tileLayer = L.tileLayer.provider(map.provider, map.options);
    layersInLayersControl[TAPi18n.__(map.key)] = map.tileLayer;
  });
  var initialTileLayer = LeafletConfig.tileMaps[0].tileLayer;
  map = L.map('map', {
    center: [LeafletConfig.defaultMapCenter.latitude, LeafletConfig.defaultMapCenter.longitude],
    zoom: LeafletConfig.locationNotFoundZoom,
    layers: [initialTileLayer]
  });
  L.control.layers(layersInLayersControl).addTo(map);
  geocoder = L.Control.geocoder({
    position: 'bottomleft',
    geocoder: new L.Control.Geocoder.photon()
  }).addTo(map);
  // Bind events
  var locationFoundHandler = _.partial(onLocationFound, instance);
  var locationErrorHandler = _.partial(onLocationError, instance);
  var clickHandler = _.partial(reverseGeocode, instance);
  var viewChangeHandler = _.partial(onViewChange, instance);
  map.on('locationfound', locationFoundHandler);
  map.on('locationerror', locationErrorHandler);
  map.on('click', clickHandler);
  map.on('moveend', viewChangeHandler);
  map.locate({
    setView: true,
    maxZoom: LeafletConfig.defaultZoom
  });
  pruneCluster = new PruneClusterForLeaflet();
  var onMarkerClickHandler = _.partial(onMarkerClick, instance);
  pruneCluster.PrepareLeafletMarker = function(marker, data) {
    //marker.setIcon(L.Icon.Default); // See http://leafletjs.com/reference.html#icon
    //listeners can be applied to markers in this function
    marker.on('click', onMarkerClickHandler);
    marker.options.incident = data.incident;
    // A popup can already be attached to the marker
    // bindPopup can override it, but it's faster to update the content instead
    if (marker.getPopup()) {
      marker.setPopupContent(data.incident.title);
    } else {
      marker.bindPopup(data.incident.title);
    }
  };
  map.addLayer(pruneCluster);
};

const setBikesInVicinity = function(instance, e) {
  const latlng = e.latlng;
  const lng = latlng.lng;
  const lat = latlng.lat;
  const bbox = {
    _southWest: {
      lng: lng - 0.0010,
      lat: lat - 0.0009
    },
    _northEast: {
      lng: lng + 0.0010,
      lat: lat + 0.0009
    }
  };
  const boundingPolygon = getBoundingPolygon(bbox);
  Meteor.call('location:incidentsInVicinity', boundingPolygon, function(error, count) {
    instance.bikesInVicinity.set(count);
  });
};

/**
 * Shows the user's location on the map
 * @param  {Object} options Must contain the following information:
 *                          {L.LatLng} latlng: an object containing latitude and longitude
 *                          {Number}   accuracy: the accuracy of the location in meters
 */
var showUserLocation = function(options) {
  L.userMarker(options.latlng, {
    pulsing: true,
    smallIcon: true
  }).addTo(map);
};

/**
 * If the user's location could be determined, show a marker on the map
 */
var onLocationFound = function(instance, e) {
  showUserLocation(e);
  setBikesInVicinity(instance, e);
};

/**
 * Called if no location could be found
 */
var onLocationError = function(instance, e) {
  // TODO Set location based on location setting of user
  // Could also inform user that a location might be retrieved if WIFI is turned on.
  console.log(e.message);
  onViewChange(instance);
};

/**
 * Sets the bounding box (rectangle) for which Things are retrieved from the database.
 * This is called if the map view changes, e.g. by zooming or dragging around.
 */
var setBoundingBox = function(instance) {
  var bbox = getBoundingPolygon(map.getBounds());
  instance.boundingBox.set(bbox);
};

/**
 * Limit the calls of setBoundingBox to once every 400ms, since each
 * change of the bounding box would trigger a database query.
 */
var setBoundingBoxDebounced = _.debounce(setBoundingBox, 400);

/**
 * React on view changes (zooming, dragging etc.)
 */
var onViewChange = function(instance) {
  setBoundingBoxDebounced(instance);
};

Template.locationPickLocation.helpers({
  riskClass() {
    const instance = Template.instance();
    const count = instance.bikesInVicinity.get();
    const riskClass = count === 0 ? 'safe' : count <= 3 ? 'medium' : 'risk';
    return riskClass;
  }
});
