Template.logged_in.events({
  'click .logout': function (event) {
    event.preventDefault();

    Meteor.logout(function onAfterLogout (err) {
      if (err) { throw err; }
    });
  }
});
