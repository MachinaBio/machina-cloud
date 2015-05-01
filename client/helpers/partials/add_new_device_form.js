Template.add_new_device_form.helpers({

  addDeviceArrowPath: function () {
    var startX = 835;
    var startY = 175;
    var trunkLength = 25;
    var wingLength = 25;
    var centerPoint = wingLength + (wingLength / 1);
    var pointHeight = 75;

    return 'M' + startX + ',' + startY +
      'l0,-' + trunkLength +
      'l-' + wingLength + ',0' +
      'l' + centerPoint + ',-' + pointHeight +
      'l' + centerPoint + ',' + pointHeight +
      'l-' + wingLength + ',0' +
      'l0,' + trunkLength +
      'Z'
      ;
  },

  userHasDevices: function (element, template) {

    if (AquinoDevices.find().fetch().length) {
      return 'user-has-devices';
    }

    return '';
  }
});
