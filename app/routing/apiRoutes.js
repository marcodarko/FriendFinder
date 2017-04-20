

var friendsData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/tables", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table

    // the data you're sending in with your info
    var yourInfo = req.body;
    // where friend found will be stored, default is first index
    var closestMatch = 0;

    // will compare the difference against this, 50 is a random number
    // if the difference of the current comparison is lower than 20 loswest so far will be the most
    // current difference
    var lowestTotalSoFar = 50;

    // loop through existing array to find closest match

   	for(index =0 ; index < friendsData.length; index++){

   		// loop through current index and compare its answers to our answers
   		for(innerIndex =0 ; innerIndex < friendsData[index].answers.length; innerIndex++){

   			// will store the subraction of the current answers
   			var currentComparison = parseFloat(yourInfo.answers[innerIndex]) - parseFloat(friendsData[index].answers[innerIndex]);

   			// if that number is higher than 0 it'll get added to our Difference total
   			if( currentComparison > 0 ){

   				var thisTotal =+ currentComparison
   			};

   		};

   		// once it's done looping through an index we will compare the difference to
   		// our LowestSoFar and if it's lowest we will store the current index on FriendsData in
   		// closesMatch to keep track of it
   		if(thisTotal < lowestTotalSoFar){

   			closestMatch = index;
   		};
   	};

   	// pushed new data to our data array
      friendsData.push(req.body);

      // we respond with the index of the closest match
      res.send(friendsData[closestMatch]);
   
  });

};

// exporting it this way makes the function happen right away when this file is 
// required and a request is made