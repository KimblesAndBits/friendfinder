var friends = require("./../data/friends").friends.friends;
module.exports = (app) => {
    app.get("/api/friends", (req, res) => {
        var you = req.body;
        var match;
        var matchNumber = 40;
        friends.forEach(element => {
            var thisMatch = 0;
            for (var i =0; i < element.scores.length; i++) {
                thisMatch += Math.abs(element.scores[i] - you.scores[i]);
            };
            if (thisMatch < matchNumber && element.name !== you.name) {
                matchNumber = thisMatch;
                match = element;
            };
        })
        return res.json(match);
    });

    app.post("/api/friends", (req, res) => {
        var newFriend = req.body;
        for (var i = 0; i < newFriend.scores.length; i++) {
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        };
        friends.push(newFriend);
        console.log("Succefully added a new friend");
        console.log(friends);
        return res.json("false");
    });
};