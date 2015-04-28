Meteor.publish('AquinoDevices', function publishUserAquinoDevices (user) {

  this.ready();
  return AquinoDevices.find({registered: user});
});

Meteor.methods({

  'deviceReport': function (device, versions) {

    var existingDevice = AquinoDevices.findOne(device);
    var registered = existingDevice ? existingDevice.registered : false;

    AquinoDevices.upsert(device, {
      versions: versions,
      registered: registered
    });
  },

  'addDevice': function (serialNumber, user) {

    var device = AquinoDevices.findOne({_id: serialNumber});

    if (device && ! device.registered) {
      AquinoDevices.update({_id: serialNumber}, {registered: user});
      return { registered: true };

    } else if (device && device.registered) {
      return {
        registered: false,
        taken: true
      };

    } else {
      return {
        registered: false,
        exists: false
      };
    }
  }
});

AquinoDevices.allow({

  update: function (userId, doc, fieldNames, modifier) {

    if (userId === Meteor.user()._id &&
        Meteor.user().emails[0].address === doc.registered) {

      return true;
    }
    return false;
  }
});
