Router.configure({
  layoutTemplate: 'default_layout'
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
