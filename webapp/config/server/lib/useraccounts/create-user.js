/* global Accounts */

/**
 * Global hook that is executed when a new user is being added.
 * Such a hook can only be registered once.
 */

Accounts.onCreateUser(function(options, user) {
  // Copy user profile to user object (default behavior of Accounts package onCreateUser hook)
  if (options.profile) {
    user.profile = options.profile;
  }
  // Add user to newsletter
  const email = options.email;
  if (email) {
    Meteor.call('newsletter:subscribeOnSignup', email);
  }
  return user;
});
