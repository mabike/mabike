const NotificationFakeStream = app.NotificationFakeStream;

Template.navbar.events({
  'click .js-button-logout': () => {
    console.log('button clicked');
    NotificationFakeStream.emit('bikeFound');
  }
});
