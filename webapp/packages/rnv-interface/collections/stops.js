const stopsCollection = new Mongo.Collection('rnvstops');

app.Collections.rnvStops = stopsCollection;

var geoJSONPointSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Point']
  },
  coordinates: {
    type: [Number],
    decimal: true
  }
});

var stopSchema = new SimpleSchema([app.Schemas.commonMetadata, {
  name: {
    type: String,
    optional: true
  },
  location: {
    type: Object,
    optional: true
  },
  'location.center': {
    type: geoJSONPointSchema,
    index: '2dsphere',
  }
}]);

app.Schemas.rnvStop = stopSchema;

stopsCollection.attachSchema(stopSchema);
