if (Meteor.isClient) {

  // Prevent router from starting before we have set our Session parameters
  FlowRouter.wait();

  Meteor.startup(function() {
    // var currentLayout = runningOnMobile ? 'layoutMobileMain' : 'layoutWebappMain';
    // TODO Remove mobile layout
    Session.set('currentLayout', 'layoutWebappMain');
    // Allow the router to initialize itself
    // This late initialization ensures that auto-logins have taken place
    FlowRouter.initialize();
  });

}
