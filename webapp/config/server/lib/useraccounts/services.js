/*global ServiceConfiguration*/
/**
 * Initialize user account services based on Meteor.settings
 */

Meteor.startup(function() {
  for (var service in Meteor.settings.accounts) {
    ServiceConfiguration.configurations.upsert({
      service: service
    }, {
      $set: Meteor.settings.accounts[service]
    });
  }
});