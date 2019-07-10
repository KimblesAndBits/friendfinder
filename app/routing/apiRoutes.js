module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        var you = req.body;
        var match;
        var matchNumber = 40;
        friends.forEach(element => {
            var thisMatch = 0;
            for (var i =0; i < element.scores.length; i++) {
                thisMatch += Math.abs(element.scores[i] - you.scores[i]);
            };
            if (thisMatch < matchNumber) {
                matchNumber = thisMatch;
                match = element;
            };
        })
        return res.json(match);
    });

    app.post("/api/friends", function (req, res) {
        //Add the shit
    });
};