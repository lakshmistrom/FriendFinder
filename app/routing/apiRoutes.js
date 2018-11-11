// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends
// ===============================================================================
var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the friends array of objects)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out the survey... this data is then sent to the server...
    // Then the server saves the data to the Friends array)
    // ---------------------------------------------------------------------------
    app.post("/api/friends", function (req, res) {
        //initialize the smallest value
        let smallest = 1000;

        //initialize the friend that will become the match friend
        let closestFriend = null;

        //loop through all the friends
        for (var i = 0; i < friends.length; i++) {
            //initialize temporary smallest value
            let tempSmallest = totalDifference(friends[i].scores, req.body.scores);

            //reassign the smallest value if it is less than the current one
            if(tempSmallest < smallest){
                //set smallest value
                smallest = tempSmallest;

                //assign current friend to closes friend
                closestFriend = friends[i];
            }
        }
        //add new friend to friends array of objects
        friends.push(req.body);

        //respond back with the closes friend inside the modal
        res.json(closestFriend);

    });

    //the following function will output the total difference between two friends
    function totalDifference(arr1, arr2) {
        //initialize the values that will hold the values to be compared from the arrays and the substraction
        let temp1, temp2, taken;
        //initialize the total of all the substraction put together
        let total = 0;

        //iterate over the array
        for (var i = 0; i < arr1.length; i++) {
            //assign the first value from the first array
            temp1 = arr1[i];

            //assign the first value from the second array
            temp2 = arr2[i];
            
            //assign the substraction of the first values in both arrays
            taken = Math.abs(temp1 - temp2);

            //assign the addition of all the substracted values to total
            total += taken;
        }
        //send back the total back
        return total;
    }
    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = [];
        res.json(true);
    });
}