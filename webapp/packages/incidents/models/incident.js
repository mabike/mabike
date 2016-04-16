/* global Incident */
/* jshint -W020 */

Incident = class Incident {
  constructor(obj) {
    obj = obj || {};
    this._id = obj._id || Random.id();
    this.stolenAt = obj.stolenAt || new Date();
    this.bikeId = obj.bikeId || Random.id();
    obj.reporter = obj.reporter || {};
    this.reporter = {
      _id: obj.reporter._id || Random.id(),
      username: obj.reporter.username || ''
    };

    if (!obj.location) {
      throw Meteor.Error('Incident needs a location property');
    }
    this.location = {
      bbox: obj.location.bbox,
      center: obj.location.center
    };
    this.data = {
      properties: (obj.data || {}).properties
    };
  }
};
