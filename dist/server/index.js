"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
// Get our API routes
var api_1 = require("./routes/api");
var app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));
// Set our api routes
app.use('/api', api_1.api);
// Catch all other routes and return the index file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () { return console.log("API running on localhost:" + port); });
//# sourceMappingURL=index.js.map