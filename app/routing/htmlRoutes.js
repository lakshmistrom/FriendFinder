var path = require("path");
// Basic route that sends the user first to the AJAX Page
var htmlRoutes = function(app, dirname){
app.get("/", function(req, res) {console.log(res);
    res.sendFile(path.join(dirname, "/app/public/home.html"));
  });
}
module.exports = htmlRoutes;