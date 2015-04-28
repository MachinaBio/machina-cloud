if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.reset_password.helpers({
  resetPassword: function () {
    return Session.get('resetPassword');
  }
});

Template.reset_password.events({
  'submit .email-reset-link': function (event, element) {
    event.preventDefault();

    var email = element.$('.email-input').val();

    Accounts.forgotPassword({ email: email }, function (err) {
      if (err) {
        element.$('h2').addClass('error-message')
          .html('Looks like we don\'t have that account.  ' +
                '<a href="/register">Did you register?</a>'
               );
        return;
      }

      element.$('h2').addClass('success').html('Sent.  Check your email.');
    });
  },
  'submit .new-password': function (event, element) {
    event.preventDefault();

    var password = element.$('.password-input').val();
    var confirm = element.$('.confirm-input').val();
    var matchLowercase = /[a-z]/;
    var matchUppercase = /[A-Z]/;
    var matchNumber = /[0-9]/;
    var matchSymbol = /[^a-zA-Z0-9]/;

    if (password === confirm &&
      matchLowercase.test(password) &&
      matchUppercase.test(password) &&
      matchNumber.test(password) &&
      matchSymbol.test(password)) {

      Accounts.resetPassword(
        Session.get('resetPassword'),
        password,
        function (err) {

          if (err) {
            element.$('h2').addClass('error-message')
              .html('Sorry, but we had a problem with that.  Try again later.')
              ;
            return;
          }

          Session.set('resetPassword', null);
          Router.go('/devices');

      });
    } else if (password !== confirm) {

      element.$('.confirm-input').addClass('error');
      element.$('h2').addClass('error-message')
        .html('You need to confirm your password by typing it again.')
        ;
    } else {

      element.$('.password-input').addClass('error');
      element.$('h2').addClass('error-message')
        .html('Password must be 12 characters, ' +
              'contain at lease one symbol, ' +
              'uppercase letter, ' +
              'lowercase letter, ' +
              'and number each.'
             );
    }

  }
});
