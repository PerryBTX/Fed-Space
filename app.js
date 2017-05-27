require("./bot.js");

var http = require('http');
var port = process.env.PORT || 8080;
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('I am just a discord bot');
});
server.listen(port);
console.log("web server running on", port)