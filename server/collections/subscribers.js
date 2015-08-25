Meteor.methods({

  'addSubscriber': function (email) {
  	var mailingLists = new MailChimpLists("cfd8488160959200c417f5f936a1282e-us11", { version : '2.0' });
  	mailingLists.subscribe({
  		apikey: "cfd8488160959200c417f5f936a1282e-us11",
  		email: { 
  			email : email,
  			},
  		id: "d227f6b1ef"
  		},
  		function (error, results) {
  			console.log("Error: ",error);
  			console.log("Results: ",results);

  	});

    Subscribers.upsert(email, { subscribed: true });
    
  }
});
