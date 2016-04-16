/* global ModalDialog */

const NotificationFakeStream = app.NotificationFakeStream;

NotificationFakeStream.on('bikeFound', function() {
  ModalDialog.template.set('dialogBikeFound');
  ModalDialog.show();
});
