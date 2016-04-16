Template.buttonbar.events({
  'click .js-button-map': () => {
    FlowRouter.go('map');
  },
  'click .js-button-feed': () => {
    FlowRouter.go('feed');
  }
});
