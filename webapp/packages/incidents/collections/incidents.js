var incidentsCollection = new Mongo.Collection('incidents');
app.Collections.incidents = incidentsCollection;

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

var incidentSchema = new SimpleSchema([app.Schemas.commonMetadata, {
  title: {
    type: String,
    optional: true
  },
  stolenAt: {
    type: Date,
    optional: true
  },
  bikeId: {
    type: String,
    optional: true
  },
  reporter: {
    type: Object
  },
  'reporter._id': {
    type: String
  },
  'reporter.username': {
    type: String
  },
  // Location of the Bike
  location: {
    type: Object,
    optional: true
  },
  'location.center': {
    type: geoJSONPointSchema,
    index: '2dsphere',
  },
  'location.bbox': {
    type: Object, // geoJSONPolygonSchema
    optional: true,
    blackbox: true
  },
  // Custom data, depending on 'type'
  data: {
    type: Object,
    optional: true,
    blackbox: true
  }
}]);

app.Schemas.incident = incidentSchema;

incidentsCollection.attachSchema(incidentSchema);
