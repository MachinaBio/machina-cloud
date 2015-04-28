function countDevices () {

  return AquinoDevices.find().fetch();
}

var addDeviceFormActive = false;

Template.devices.onRendered(function setActive () {

  $('.devices-link').addClass('active');

  TweenMax.fromTo(this.$('.add-device-indicator-arrow'), 1, {
    opacity: 0,
    y: 20,
    ease: Expo.easeOut
  }, {
    delay: 2,
    opacity: 1,
    y: 0
  });
});

Template.devices.helpers({

  deviceCount: function () {
    return countDevices();
  },

  devices: function () {
    var user = Meteor.user().emails[0].address;

    return AquinoDevices
      .find({registered: user})
      .fetch()
      .map(function (device, index) {
        device._index = index + 1;
        device._vertical_position = 75 + (device._index * 100);
        device._text_vertical_position = device._vertical_position + 57;
        device._input_vertical_position = device._vertical_position + 33;
        return device;
      })
      ;
  },

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
  }
});

Template.devices.events({

  'blur .device-name-input': function (event, element) {

    if (event.target.value === '') {
      element.find('.submit-device-name').innerHTML = '✎';
    }
  },

  'focus .device-name-input': function (event, element) {

    element.find('.submit-device-name').innerHTML = '✓';
  },

  'submit .add-device-name-form': function (event, element) {
    event.preventDefault();
    var input = element.find('.device-name-input');

    if (input.value === '') {
      input.focus();

    } else {
      AquinoDevices.update({_id: element.find('.serial-number').innerHTML}, {
        $set: {
          name: input.value
        }
      });
    }
  },

  'submit .add-new-device form': function (event, element) {
    event.preventDefault();

    var serialNumber = element.find('input').value;
    var user = Meteor.user().emails[0].address;
    var notification;

    Meteor.call(
      'addDevice',
      serialNumber,
      user,
      function reportResult () {

      var result = arguments[1];

      if (result.taken) {
        notification = 'That device is already registered.  ' +
          'Try a different serial number?'
          ;
        element.find('.notification').innerHTML = notification;

      } else if (! result.exists) {
        notification = 'We can\'t find that device.  ' +
          'Make sure it can reach the internet.'
          ;
        element.find('.notification').innerHTML = notification;

      } else if (result.registered) {
        console.log('Device', serialNumber, 'now belongs to', user);
      }
    });
  },

  'click .add-device-button': function (event, element) {

    var timeline;

    if (countDevices().length) {
      debugger;
    } else if (! addDeviceFormActive) {

      timeline = new TimelineMax();
      timeline
        .to([
          element.$('.add-device-indicator-arrow'),
          element.$('.no-devices')
        ], 0.25, {
          opacity: 0,
          ease: Expo.easeOut
        })
        .to(element.$('.add-new-device'), 0.25, {
          opacity: 1,
          ease: Expo.easeOut
        })
        ;

      addDeviceFormActive = true;
    }
  }
});
