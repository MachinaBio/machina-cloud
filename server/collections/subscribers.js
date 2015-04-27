Meteor.methods({

  'addSubscriber': function (email) {

    Subscribers.upsert(email, { subscribed: true });
  }
});
