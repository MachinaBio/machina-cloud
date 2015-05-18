Meteor.startup(function startup () {

  process.env.MAIL_URL = 'smtp://postmaster@machina.bio:M4ch1na!@smtp.mailgun.org:587/';

  Accounts.emailTemplates.siteName = "MachinaBio";
  Accounts.emailTemplates.from = "MachinaBio <no-reply@machina.bio>";
  Accounts.emailTemplates.resetPassword.html = function (user, url) {
    return 'We have reset your password.  ' +
      'To set a new the password, please visit:  ' +
      url
    ;
  }

  Meteor.onConnection(function (connection) {
    connection.onClose(function () {
      var device = AquinoDevices.findOne({sessionId: connection.id});

      if (device) {
        var timestamps = device.timestamps;
        var status = 'Offline';

        timestamps.push(Date.now());
        AquinoDevices.update({sessionId: connection.id}, {
          $set: {
            status: status,
            timestamps: timestamps
          }
        });
      }
    });
  });

});
