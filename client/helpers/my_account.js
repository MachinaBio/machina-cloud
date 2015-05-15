Template.my_account.onRendered(function setActive () {

  $('body').attr('class', '').addClass('my-account');
  $('.active').removeClass('active');
  $('.my-account-link').addClass('active');
});

Template.my_account.helpers({
  user_email: function () {
    return Meteor.user().emails[0].address;
  }
});
