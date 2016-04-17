const NotificationFakeStream = app.NotificationFakeStream;

Template.navbar.events({
  'click .js-button-logout': () => {
    NotificationFakeStream.emit('bikeFound');
    Meteor.call('philipshue:flashLights');
  }
});
