Template.login.events({
  'submit .login-form': function (event, element) {
    event.preventDefault();

    var email = element.find('.email-input').value;
    var password = element.find('.password-input').value;
    var matchLowercase = /[a-z]/;
    var matchUppercase = /[A-Z]/;
    var matchNumber = /[0-9]/;
    var matchSymbol = /[^a-zA-Z0-9]/;

    if (matchLowercase.test(password) &&
      matchUppercase.test(password) &&
      matchNumber.test(password) &&
      matchSymbol.test(password)) {

      Meteor.loginWithPassword(email, password, function notifyUser (err) {
        if (err) {
          element.$('h2').addClass('error-message')
            .html('Invalid login credentials.')
            ;
        } else {
          Router.go('/dashboard');
        }
      });

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
