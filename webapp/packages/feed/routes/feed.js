FlowRouter.route('/feed', {
  action: function() {
    var currentLayout = Session.get('currentLayout');
    BlazeLayout.render(currentLayout, {
      mainCanvas: 'feed'
    });
  },
  name: 'feed'
});
