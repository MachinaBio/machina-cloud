Router.configure({
  layoutTemplate: 'default_layout'
});

Router.onAfterAction(function setTitle () {
  var title = this.url
    .replace('http://', '')
    .replace('https://', '')
    .replace(window.location.host, '')
    ;

  title = title.split('/');
  title.shift();

  _.each(title, function breakIntoWords (value, index) {
    title[index] = value.split('-');

    _.each(title[index], function capitalizeFirstLetter (subValue, subIndex) {
      title[index][subIndex] = subValue.charAt(0).toUpperCase() +
        subValue.slice(1)
        ;
    });

    title[index] = title[index].join(' ');
  });

  document.title = 'MachinaBio > ' + title.join(' > ');
});

Router.route('/', 'home');
Router.route('/login', {
  template: 'login',
  layoutTemplate: 'sub_page_layout'
});
Router.route('/register', {
  template: 'register',
  layoutTemplate: 'sub_page_layout'
});
Router.route('/reset-password', {
  template: 'reset_password',
  layoutTemplate: 'sub_page_layout'
});
Router.route('/devices', {
  template: 'devices',
  layoutTemplate: 'dashboard_layout'
});
Router.route('/logout', function logout () {
  Meteor.logout(function onAfterLogout (err) {
    if (err) { throw err; }

    Router.go('/');
  });
});
