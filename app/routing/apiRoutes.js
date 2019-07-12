var friends = require("./../data/friends").friends.friends;
module.exports = (app) => {
    app.get("/api/friends", (req, res) => {
        var you = friends[friends.length - 1];
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
        return res.json("false");
    });

    app.get("/api/friends/:name", (req, res) => {
        var you;
        friends.forEach(element => {
            if (req.params.name === element.name) {
                you = element;
            };
        });
        if (typeof you === 'undefined') {
            you = {
                name: "No one",
                password: "nothing"
            };
        };
        var match = [you];
        var matchNumber = 40;
        friends.forEach(element => {
            var thisMatch = 0;
            for (var i =0; i < element.scores.length; i++) {
                thisMatch += Math.abs(element.scores[i] - you.scores[i]);
            };
            if (thisMatch < matchNumber && element.name !== you.name) {
                matchNumber = thisMatch;
                match.push(element);
            };
        });
        return res.json(match);
    });
};