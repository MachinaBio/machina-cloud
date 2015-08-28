Meteor.methods({

  'addSubscriber': function (email) {
    var API_KEY = "cfd8488160959200c417f5f936a1282e-us11";
    var LIST_ID = "d227f6b1ef";
    
  	var mailingLists = new MailChimpLists(API_KEY, { version : '2.0' });
  	mailingLists.subscribe({
  		apikey: API_KEY,
  		email: { 
  			email : email,
  			},
  		id: LIST_ID
  		},
  		function notifyForSubscriptionResults (error, results) {
  			console.log("Error: ", error);
  			console.log("User subscribed.  Results: ", results);

  	});

    Subscribers.upsert(email, { subscribed: true });
    
  }
});
