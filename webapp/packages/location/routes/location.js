FlowRouter.route('/location', {
  action: function() {
    var currentLayout = Session.get('currentLayout');
    BlazeLayout.render(currentLayout, {
      mainCanvas: 'locationPickLocation'
    });
  },
  name: 'location'
});
