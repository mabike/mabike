const firstName = Random.choice([
  'David', 'Elias', 'Marie', 'Sophia', 'Anna', 'Ben', 'Emil', 'Laura', 'Leonie', 'Hanna'
]);

Template.dialogBikeFound.onCreated(function() {
  const instance = this;
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
