var WebSocketServer = require('websocket').server;
var http = require('http');

var webSocketsServerPort = 1337;

var server = http.createServer(function (request, response) {
});
server.listen(webSocketsServerPort, function () {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);

    connection.sendUTF(JSON.stringify({name : 'Vasya' }))
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function (connection) {
        // close user connection
    });
});


module.exports = chatModule;


function chatModule() {
    var messages = [];
    var users = [];
}
