/* global ModalDialog */

var firstName;

Template.dialogBikeFound.onCreated(function() {
  const instance = this;
  ModalDialog.onHide = resetDialog;
  firstName = Random.choice([
    'David', 'Elias', 'Marie', 'Sophia', 'Anna', 'Ben', 'Emil', 'Laura', 'Leonie', 'Hanna'
  ]);
  instance.nameRank = new ReactiveVar();
  Meteor.call('maOpenData:getNameRank', firstName, function(error, result) {
    instance.nameRank.set(result);
  });
});

Template.dialogBikeFound.helpers({
  date() {
    return '2016/04/01';
  },
  firstName() {
    return firstName;
  }
});

var resetDialog = function() {
  // This allows the requester to send another request from the user profile page
  ModalDialog.template.set();
};

Template.dialogBikeFound.onDestroyed(function() {
  if (ModalDialog.onHide === resetDialog) {
    ModalDialog.onHide = undefined;
  }
});
