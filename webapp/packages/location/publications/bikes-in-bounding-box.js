/**
 * This method gets all incidents that are located inside a given geospatial bounding box.
 */

const incidentsCollection = app.Collections.incidents;

// Fields to be returned for each incident in the bounding box
const incidentFields = {
  title: 1,
  type: 1,
  'location.center': 1
};

const incidentsInBoundingBox = function(boundingBox) {
  var cursor = incidentsCollection.find({
    'location.center': {
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: boundingBox
        }
      }
    }
  }, {
    fields: incidentFields
  });
  return cursor;
};

Meteor.publish('location:incidentsOnMap', function(boundingBox) {
  check(boundingBox, [
    [
      [Number]
    ]
  ]);
  return incidentsInBoundingBox(boundingBox);
});

Meteor.methods({
  'location:incidentsInVicinity': function(boundingBox) {
    check(boundingBox, [
      [
        [Number]
      ]
    ]);
    const count = incidentsInBoundingBox(boundingBox).count();
    return count;
  }
});
