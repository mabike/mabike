/* global ModalDialog, moment */

let picker;

var resetDialog = function() {
  // This allows the requester to send another request from the user profile page
  ModalDialog.template.set();
};

Template.dialogAddIncident.onCreated(function() {
  const instance = this;
  ModalDialog.onHide = resetDialog;
  instance.nextStops = new ReactiveVar();
  const location = instance.data.location;
  const coordinates = location.location.center.coordinates;
  const latlng = {
    lng: coordinates[0],
    lat: coordinates[1]
  };
  Meteor.call('rnv:getNextStop', latlng, function(error, result) {
    if (!result || result.length === 0) {
      instance.nextStops.set(undefined);
      return;
    }
    const nextStops = [result[0]];
    instance.nextStops.set(nextStops);
  });
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

Template.dialogAddIncident.events({
  'click .js-button-report': (event, instance) => {
    const location = instance.data.location;
    // const rawDate = $('#incidentDate').val();
    // const incidentDate = moment(rawDate);
    const date = picker.data("DateTimePicker").date().toDate();
    Meteor.call('incidents:add', {
      location: location,
      date: date
    });
    ModalDialog.hide();
  }
});
