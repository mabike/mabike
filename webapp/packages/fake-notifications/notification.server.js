const NotificationFakeStream = app.NotificationFakeStream;

// console.log('registering');

NotificationFakeStream.permissions.read(function() {
  return true;
});
NotificationFakeStream.permissions.write(function() {
  return true;
});
NotificationFakeStream.on('bikeFound', function() {
  NotificationFakeStream.emit('bikeFound');
});
