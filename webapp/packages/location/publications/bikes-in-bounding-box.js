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

Meteor.publish('location:incidentsInBoundingBox', function(boundingBox) {
  check(boundingBox, [
    [
      [Number]
    ]
  ]);
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
});
