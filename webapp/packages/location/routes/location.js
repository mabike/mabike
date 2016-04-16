FlowRouter.route('/map', {
  action: function() {
    var currentLayout = Session.get('currentLayout');
    BlazeLayout.render(currentLayout, {
      mainCanvas: 'locationPickLocation'
    });
  },
  name: 'map'
});
