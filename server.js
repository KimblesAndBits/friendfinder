var express = require("express");
var path = require("path");
var app = express();
var PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./app/routing/htmlRoutes")(app, path);
require("./app/routing/apiRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});