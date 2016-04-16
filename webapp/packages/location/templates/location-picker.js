/* global L, LeafletConfig, PruneClusterForLeaflet, PruneCluster, ModalDialog */

// const thingsCollection = app.Collections.things;

var map; // Leaflet map object
var geocoder; // Geocoder to be used for reverse geocoding
var geocoderMarker; // Marker to be set on reverse geocoding
var selectedLocation; // Location the user has selected
var thingMarkers = {}; // Hash map containing all Things that are shown on the map
var pruneCluster;

Template.locationPickLocation.onCreated(function() {
  var instance = this;
  instance.showConfirmButton = new ReactiveVar(false);
  instance.boundingBox = new ReactiveVar();
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
    instance.subscribe('location:thingsInBoundingBox', boundingBox);
  });
  // // Get all things inside the visible map
  // instance.autorun(function() {
  //   var things = thingsCollection.find({}).fetch();
  //   //var onMarkerClickHandler = _.partial(onMarkerClick, instance);
  //   _.each(things, function(thing) {
  //     if (thingMarkers[thing._id]) {
  //       // Thing has already been added to the map.
  //       return;
  //     }
  //     thingMarkers[thing._id] = true;
  //     var coordinates = ((thing.location || {}).center || {}).coordinates;
  //     if (!coordinates) {
  //       return;
  //     }
  //     var marker = new PruneCluster.Marker(coordinates[1], coordinates[0]);
  //     marker.data.thing = thing;
  //     marker.data.popup = thing.title;
  //     pruneCluster.RegisterMarker(marker);
  //     /*
  //           var latlng = [coordinates[1], coordinates[0]];
  //           L.marker(latlng, {
  //             thing: thing
  //           }).on('click', onMarkerClickHandler).addTo(map).bindPopup(thing.title);
  //     */
  //   });
  //   pruneCluster.ProcessView();
  // });
});

/**
 * Called if the user clicks on an existing Thing marker on the map
 */
var onMarkerClick = function(instance, event) {
  selectedLocation = event.target.options.thing;
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
  console.dir(selectedLocation);
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
          coordinates: [location.center.lng, location.center.lat]
        }
      },
      data: {
        properties: location.properties
      },
      source: 'osm'
    };
    selectedLocation = locationDoc; //new AppMain.LocationThing(thingDoc);
    setUserMarker(instance);
    ModalDialog.data.set({
      location: selectedLocation
    });
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
  thingMarkers = {};
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
    marker.options.thing = data.thing;
    // A popup can already be attached to the marker
    // bindPopup can override it, but it's faster to update the content instead
    if (marker.getPopup()) {
      marker.setPopupContent(data.thing.title);
    } else {
      marker.bindPopup(data.thing.title);
    }
  };
  map.addLayer(pruneCluster);
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
  showConfirmButton: function() {
    var instance = Template.instance();
    return instance.showConfirmButton.get();
  }
});

var onConfirmButton = function() {
  AppMain.thingManager.insertThing(selectedLocation, function(error, result) {
    if (error) {
      // TODO Error handling
      AppMain.dir(error);
      return;
    }
    FlowRouter.go('/thing/' + result);
  });
};

Template.locationPickLocation.events({
  'click .js-confirm-button': onConfirmButton
});
