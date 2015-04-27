Accounts.onResetPasswordLink(function visitResetPasswordPage () {
  Router.go('/reset-password');
});

Accounts.onLogin(function subscribeUserData () {

  var user = Meteor.user().emails[0].address;
  Meteor.subscribe('AquinoDevices', user);
});
