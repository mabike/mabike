/* global ModalDialog */

var resetDialog = function() {
  // This allows the requester to send another request from the user profile page
  ModalDialog.template.set();
};

Template.dialogAddIncident.onCreated(function() {
  ModalDialog.onHide = resetDialog;
});

Template.dialogAddIncident.onRendered(function() {
  Meteor.defer(() => $('.datetimepicker').datetimepicker());
});

Template.dialogAddIncident.onDestroyed(function() {
  if (ModalDialog.onHide === resetDialog) {
    ModalDialog.onHide = undefined;
  }
});


Template.dialogAddIncident.helpers({});

Template.dialogAddIncident.events({
  'click .js-button-report': () => {

  }
});
