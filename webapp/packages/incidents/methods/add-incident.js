const incidentsCollection = app.Collections.incidents;

Meteor.methods({
  'incidents:add': function(obj) {
    check(obj, {
      location: Object,
      date: Date
    });
    const location = obj.location;
    const date = obj.date;
    const userId = Random.id();
    const incidentDoc = {
      title: location.title,
      stolenAt: date,
      bikeId: Random.id(),
      reporter: {
        _id: userId,
        username: 'MrPink'
      },
      location: location.location,
      data: location.data
    };
    incidentsCollection.insert(incidentDoc);
  }
});
