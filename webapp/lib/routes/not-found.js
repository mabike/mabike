var renderPage = function(template) {
  var currentLayout = Session.get('currentLayout');
  var appMenu = 'chromeAppMenu';
  if (!Meteor.userId()) {
    appMenu = '';
  }
  BlazeLayout.render(currentLayout, {
    mainCanvas: template,
    appMenu: appMenu
  });
};

FlowRouter.notFound = {
  action: function() {
    renderPage('notFound');
  }
};

FlowRouter.route('/403', {
  name: 'notAuthorized',
  action: function() {
    renderPage('notAuthorized');
  }
});