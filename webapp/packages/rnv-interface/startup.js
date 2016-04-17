const stopsJSONFile = 'stops.json';
const stopsCollection = app.Collections.rnvStops;

Meteor.startup(function() {
  const stopsJSON = JSON.parse(Assets.getText(stopsJSONFile));
  const keys = _.keys(stopsJSON);
  _.forEach(keys, (key) => {
    const record = stopsJSON[key];
    stopsCollection.upsert({
      _id: record.id
    }, {
      $set: {
        name: record.name,
        location: {
          center: {
            type: 'Point',
            coordinates: [record.stops[0].lon, record.stops[0].lat]
          }
        }
      }
    });
  });
});
