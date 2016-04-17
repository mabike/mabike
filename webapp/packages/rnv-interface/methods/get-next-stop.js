const stopsCollection = app.Collections.rnvStops;
const maxDistance = 500; // meters


Meteor.methods({
  'rnv:getNextStop': function(latlng) {
    check(latlng, {
      lng: Number,
      lat: Number
    });
    const nextStop = stopsCollection.find({
      'location.center': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latlng.lng, latlng.lat]
          },
          $maxDistance: maxDistance
        }
      }
    }).fetch();
    return nextStop;
  }
});
