FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [function(context, redirect) {
    redirect('/map');
  }],
  action: function() {
    // var currentLayout = Session.get('currentLayout');
    // var mainCanvasContent = 'home';
    // // Render the page.
    // BlazeLayout.render(currentLayout, {
    //   mainCanvas: mainCanvasContent
    // });
  }
});
