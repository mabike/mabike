const givenNamesCollection = app.Collections.maOpenDataGivenNames;

Meteor.methods({
  'maOpenData:getNameRank': function(firstName) {
    check(firstName, String);
    const record = givenNamesCollection.findOne({
      name: firstName
    });
    return record ? record.rank : undefined;
  }
});
