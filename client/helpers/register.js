Template.register.events({
  'submit .register-form': function (event, element) {
    event.preventDefault();

    var email = element.find('.email-input').value;
    var password = element.find('.password-input').value;
    var confirm = element.find('.confirm-input').value;
    var matchLowercase = /[a-z]/;
    var matchUppercase = /[A-Z]/;
    var matchNumber = /[0-9]/;
    var matchSymbol = /[^a-zA-Z0-9]/;

    if (matchLowercase.test(password) &&
       matchUppercase.test(password) &&
       matchNumber.test(password) &&
       matchSymbol.test(password) &&
       password === confirm) {

      Accounts.createUser({ email: email, password: password }, function (err) {
        if (err) {
          element.$('.email-input').addClass('error');
          element.$('h2').addClass('error-message')
            .html('Looks like that email might be taken, ' +
                 '<a href="/reset-password">need to reset your password?</a>'
                 );

          return;
        }

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
