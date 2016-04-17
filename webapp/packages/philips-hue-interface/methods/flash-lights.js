const url = 'http://10.10.1.90/api/7iLce3inNTCkX5cbnRMRQJNeVoeLKPIDqGg9Avas/lights/';
const on = '{"on":true, "sat":254, "bri":254,"hue":0}';
const off = '{"on":false, "sat":254, "bri":254,"hue":0}';

Meteor.methods({
  'philipshue:flashLights': function() {
    for (var i = 0; i < 10; i++) {
      for (var j = 1; j <= 3; j++) {
        HTTP.call('PUT', url + j + '/state', {
          content: off
        });
      }
      Meteor.sleep(200);
      for (var k = 1; k <= 3; k++) {
        HTTP.call('PUT', url + k + '/state', {
          content: on
        });
      }
      Meteor.sleep(200);
    }
  }
});
