/* global ModalDialog, moment */

let picker;

var resetDialog = function() {
  // This allows the requester to send another request from the user profile page
  ModalDialog.template.set();
};

Template.dialogAddIncident.onCreated(function() {
  ModalDialog.onHide = resetDialog;
});

Template.dialogAddIncident.onRendered(function() {
  Meteor.defer(() => {
    picker = $('.datetimepicker');
    picker.datetimepicker({
      defaultDate: moment(),
      inline: true
    });
  });
});

Template.dialogAddIncident.onDestroyed(function() {
  if (ModalDialog.onHide === resetDialog) {
    ModalDialog.onHide = undefined;
  }
});


Template.dialogAddIncident.helpers({});

Template.dialogAddIncident.events({
  'click .js-button-report': (event, instance) => {
    const location = instance.data.location;
    // const rawDate = $('#incidentDate').val();
    // const incidentDate = moment(rawDate);
    const date = picker.data("DateTimePicker").date().format();
    console.log(date);
    console.dir(location);
  }
});
