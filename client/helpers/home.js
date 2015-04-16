Template.home.helpers({
  year: function () {
    return new Date().getFullYear();
  }
});

Template.home.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
