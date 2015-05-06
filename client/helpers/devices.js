function countDevices () {

  return AquinoDevices.find().fetch();
}

function getExistingName (serial_number) {

  return AquinoDevices.findOne(serial_number).name;
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
        var date = device.timestamps.length ?
          new Date(device.timestamps[device.timestamps.length - 1]) :
          false
          ;

        device._index = index + 1;
        device._vertical_position = 75 + (device._index * 100);
        device._text_vertical_position = device._vertical_position + 57;
        device._input_vertical_position = device._vertical_position + 33;
        device._shape_vertical_position = device._text_vertical_position - 5;
        device._jobs_icon_vertical_position = device._text_vertical_position - 25;
        device._controls_icon_vertical_position = device._text_vertical_position - 22;
        device._status = device.status || 'Unknown';
        device._status_class = device._status.toLowerCase();
        device._contact = date ?
          date.toLocaleString() :
          '(No Contact)'
          ;
        return device;
      })
      ;
  }

});

Template.devices.events({

  'blur .device-name-input': function (event, element) {

    var serial_number = $(event.target).parents('.add-device-name')
      .siblings('.serial-number')
      .html()
      ;

    if ((event.target.value === '') ||
       (event.target.value === getExistingName(serial_number))) {

      $(event.target).siblings('.submit-device-name').html('✎');
    }
  },

  'focus .device-name-input': function (event, element) {

    $(event.target).siblings('.submit-device-name').html('✓');
  },

  'submit .add-device-name-form': function (event, element) {
    event.preventDefault();
    var $input = $(event.target).children('.device-name-input');
    var serial_number = $(event.target).parents('.add-device-name')
      .siblings('.serial-number')
      .html()
      ;

    if (($input.val() === '' && ! getExistingName(serial_number)) ||
       ($input.val() === getExistingName(serial_number))) {
      $input.focus();

      return;
    } else if ($input.val() === '') {
      AquinoDevices.update({_id: serial_number}, {
        $unset: {
          name: ''
        }
      });
    } else {
      AquinoDevices.update({_id: serial_number}, {
        $set: {
          name: $input.val()
        }
      });
    }

    $(event.target).children('.submit-device-name').html('✎');
  },

  'submit .add-new-device-form': function (event, element) {
    event.preventDefault();

    var serial_number = element.find('input').value;
    var user = Meteor.user().emails[0].address;
    var notification;
    var timeline;

    Meteor.call(
      'addDevice',
      serial_number,
      user,
      function reportResult () {

      var result = arguments[1];

      if (result.taken) {
        notification = 'That device is already registered.  ' +
          'Try a different serial number?'
          ;
        element.find('.notification').innerHTML = notification;

      } else if (result.exists === false) {
        notification = 'We can\'t find that device.  ' +
          'Make sure it can reach the internet.'
          ;
        element.find('.notification').innerHTML = notification;

      } else if (result.registered) {
        console.log('Device', serial_number, 'now belongs to', user);
        addDeviceFormActive = false;

        timeline = new TimelineMax();
        timeline
        .to([
              element.$('.user-has-devices'),
              element.$('.stop-add-device').find('.text')
            ], 0.25, {
            opacity: 0,
            ease: Expo.easeOut,
            onComplete: function () {
              element.$('.user-has-devices').hide();
              element.$('.column-headers').show();
              element.find('.stop-add-device').classList.add('add-device-button');
              element.find('.add-device-button')
                .classList
                .remove('stop-add-device')
                ;
            }
          })
          .to(element.$('.column-headers'), 0.25, {
            opacity: 1,
            ease: Expo.easeOut,
            onComplete: function () {
              element.$('.add-device-button').find('.text').html('Add a Device');
              element.$('.add-device-button').find('.text').css('opacity', '');
            }
          })
          ;
      }
    });
  },

  'click .stop-add-device': function (event, element) {

    var timeline = new TimelineMax();
    timeline
      .to([
          element.$('.user-has-devices'),
          element.$('.stop-add-device').find('.text')
        ], 0.25, {
        opacity: 0,
        ease: Expo.easeOut,
        onComplete: function () {
          element.$('.user-has-devices').hide();
          element.$('.column-headers').show();
          element.find('.stop-add-device').classList.add('add-device-button');
          element.find('.add-device-button')
            .classList
            .remove('stop-add-device')
            ;
        }
      })
      .to([
          element.$('.column-headers')
        ], 0.25, {
        opacity: 1,
        ease: Expo.easeOut,
        onComplete: function () {
          element.$('.add-device-button').find('.text').html('Add a Device');
          element.$('.add-device-button').find('.text').css('opacity', '');
        }
      })
      ;
  },

  'click .add-device-button': function (event, element) {

    var timeline = new TimelineMax();

    element.find('.add-device-button').classList.add('stop-add-device');
    element.find('.stop-add-device').classList.remove('add-device-button');

    if (countDevices().length) {

      timeline
        .to(element.$('.column-headers'), 0.25, {
          opacity: 0,
          ease: Expo.easeOut,
          onComplete: function () {
            element.$('.column-headers').hide();
            element.$('.no-devices').hide();
            element.$('.add-new-device-form').show();
            element.$('.user-has-devices').show();
            element.$('.stop-add-device').find('.text').html('Stop Adding');
          }
        })
        .to([
          element.$('.add-new-device-form'),
          element.$('.user-has-devices'),
          element.$('.stop-add-device').find('.text')
        ], 0.25, {
          opacity: 1,
          ease: Expo.easeOut
        })
        ;
    } else if (! addDeviceFormActive) {

      timeline
        .to([
          element.$('.add-device-indicator-arrow'),
          element.$('.no-devices')
        ], 0.25, {
          opacity: 0,
          ease: Expo.easeOut,
          onComplete: function () {
            element.$('.add-device-indicator-arrow').hide();
            element.$('.no-devices').hide();
            element.$('.add-new-device-form').show();
          }
        })
        .to(element.$('.add-new-device-form'), 0.25, {
          opacity: 1,
          ease: Expo.easeOut
        })
        ;

      addDeviceFormActive = true;
    }
  }
});
