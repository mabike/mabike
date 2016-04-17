const givenNamesCollection = new Mongo.Collection('maopendatagivennames');

app.Collections.maOpenDataGivenNames = givenNamesCollection;

var givenNameSchema = new SimpleSchema([app.Schemas.commonMetadata, {
  name: {
    type: String
  },
  gender: {
    type: String,
    allowedValues: ['m', 'f']
  },
  rank: {
    type: Number
  }
}]);

app.Schemas.maOpenDataGivenName = givenNameSchema;

givenNamesCollection.attachSchema(givenNameSchema);
