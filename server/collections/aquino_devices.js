Meteor.publish('AquinoDevices', function publishUserAquinoDevices (user) {

  this.ready();
  return AquinoDevices.find({registered: user});
});

Meteor.publish('SingleDevice', function (serial_number) {

  this.ready();
  return AquinoDevices.find({_id: serial_number});
});

Meteor.methods({

  'pollUserDevices': function () {
    AquinoDevices.find({registered: Meteor.user().emails[0].address})
      .fetch()
      .map(function (device, index) {

        if (! Meteor.server.sessions[device.sessionId]) {

          AquinoDevices.update(device._id, {
            $set: {
              status: 'Offline'
            }
          });
        }
    });

  },

  'deviceUpdateTimestamp': function (serial_number, sessionId) {

    var timestamps = AquinoDevices.findOne(serial_number).timestamps;
    timestamps.push(Date.now());

    return AquinoDevices.update(serial_number, {
      $set: {
        timestamps: timestamps,
        sessionId: sessionId
      }
    });
  },

  'deviceStatus': function (serial_number, status) {

    var timestamps = AquinoDevices.findOne(serial_number).timestamps;
    timestamps.push(Date.now());

    return AquinoDevices.update(serial_number, {
      $set: {
        status: status,
        timestamps: timestamps
      }
    });
  },

  'deviceReport': function (serial_number, versions, jobs, devices) {

    var existingDevice = AquinoDevices.findOne(serial_number);
    var registered = (existingDevice && existingDevice.registered) ?
      existingDevice.registered :
      false
    ;
    var timestamps = (existingDevice && existingDevice.timestamps) ?
      existingDevice.timestamps :
      []
    ;
    //TODO: Just a stub for now.  Need to put this someplace sensible.
    var controls = (existingDevice && existingDevice.controls) ?
      existingDevice.controls :
      {
        Temperature: {
          Setpoints: [],
          Readings: []
        }
      }
    ;

    timestamps.push(Date.now());

    return AquinoDevices.upsert(serial_number, {
      $set: {
        versions: versions,
        registered: registered,
        timestamps: timestamps,
        jobs: jobs,
        devices: devices,
        controls: controls
      }
    });
  },

  'addDevice': function (serial_number, user) {

    var device = AquinoDevices.findOne({_id: serial_number});
    var timestamps = device ? device.timestamps : [];
    timestamps.push(Date.now());

    if (device && ! device.registered) {
      AquinoDevices.update({_id: serial_number}, {
        $set: {
          registered: user,
          timestamps: timestamps
        }
      });
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
