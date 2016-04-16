/* global ModalDialog, Keyboard */
/* jshint -W020 */

var nop = function() {};

ModalDialog = {
  template: new ReactiveVar(),
  data: new ReactiveVar(),
  size: new ReactiveVar('modal-lg'),
  show: function() {
    $('#modalDialog').modal('show');
  },
  hide: function() {
    $('#modalDialog').modal('hide');
  },
  onHide: nop,
  onShow: nop,
  onHidden: nop,
  onShown: nop
};

Template.modalDialog.onDestroyed(function() {
  ModalDialog.hide();
});

Template.modalDialog.helpers({
  template: function() {
    return ModalDialog.template.get();
  },
  data: function() {
    return ModalDialog.data.get();
  },
  size: function() {
    return ModalDialog.size.get();
  }
});

Template.modalDialog.events({
  "show.bs.modal #modalDialog": function() {
    // Disable webview shrinking on iOS which is not compatible with Bootstrap modals
    if (Meteor.isCordova && typeof Keyboard === 'function') {
      Keyboard.shrinkView(false);
    }
    if (typeof ModalDialog.onShow === 'function') {
      ModalDialog.onShow();
    }
  },
  "shown.bs.modal #modalDialog": function() {
    if (typeof ModalDialog.onShown === 'function') {
      ModalDialog.onShown();
    }
  },
  "hide.bs.modal #modalDialog": function() {
    // Re-enable webview shrinking on iOS
    if (Meteor.isCordova && typeof Keyboard === 'function') {
      Keyboard.shrinkView(true);
    }
    if (typeof ModalDialog.onHide === 'function') {
      ModalDialog.onHide();
    }
  },
  "hidden.bs.modal #modalDialog": function() {
    if (typeof ModalDialog.onHidden === 'function') {
      ModalDialog.onHidden();
    }
  }
});
