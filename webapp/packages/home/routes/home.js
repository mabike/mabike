FlowRouter.route('/', {
  name: 'home',
  action: function() {
    var currentLayout = Session.get('currentLayout');
    var mainCanvasContent = 'home';
    // Render the page.
    BlazeLayout.render(currentLayout, {
      mainCanvas: mainCanvasContent
    });
  }
});
