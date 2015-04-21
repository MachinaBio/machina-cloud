Template.default_layout.helpers({
  year: function () {
    return new Date().getFullYear();
  }
});

Template.default_layout.events({
  'submit .header-subscribe': function (event) {
    event.preventDefault();

    var input = event.target[0];
    var button = event.target[1];
    var email = input.value;

    // TODO: Gotta be a better way to do this.
    // An unsubscribe would be nice, but I can't seem to find one.
    if ($(input).hasClass('subscribed')) { return; }

    var timeline = new TimelineLite();

    $(input).addClass('subscribed');

    timeline
      .to(button, 0.2, {
        color: 'transparent',
        onComplete: function setText () {
          button.innerHTML = "Thanks!  You're on our list.";
        },
        ease: Expo.easeOut
      })
      .to(button, 0.2, {
        color: '#ffa114',
        background: 'transparent',
        cursor: 'default'
       })
      ;

    Meteor.call('addSubscriber', email);
  },

  'click .jump-to-blurbs': function (event) {

    $('#blurbs').velocity('scroll', {duration: 500});
  }
});
