/* global ModalDialog */

const NotificationFakeStream = app.NotificationFakeStream;

NotificationFakeStream.on('bikeFound', function() {
  console.log('event received');
  ModalDialog.template.set('dialogBikeFound');
  ModalDialog.show();
});
