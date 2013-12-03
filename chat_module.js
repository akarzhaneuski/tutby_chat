var WebSocketServer = require('websocket').server;
var http = require('http');
var chatDAO = require('./dao/chatDAO');
var userChatDAO = require('./dao/userChatDAO');

var webSocketsServerPort = 1337;

var users = [];

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

//    connection.sendUTF(JSON.stringify({name: 'Vasya' }))
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            var data = JSON.parse(message.utf8Data);
            console.log(data.type);
            switch (data.type) {
                case 'listen':
                    var userID = parseInt(data.userId);
                    // start listen chanel
                    // ПРОВЕРКА ПРАВ!!
                    // take username from session
                    userChatDAO.addNewListener(userID, 'VASYA', connection);
                    connection.sendUTF(JSON.stringify({
                        "type": "showMessages",
                        "data": chatDAO.getMessagesByChanel(userID)
                    }));
                    break;
                case 'sendMessage' :
                    console.log("send message");
                    // проверить права + логин из сессии
                    chatDAO.addMessage(data.message, data.chanel, "VASYA");
                    // отправить всем кроме этого юзера, дописать
                    var chanelUsers = userChatDAO.getAllUsersByChanel(parseInt(data.chanel));
                    for (var i = 0; i < chanelUsers.length; ++i) {
                        chanelUsers[i].sendUTF(JSON.stringify({
                            "type": "newChanelMessage",
                            "user": "VASYA",
                            "message": data.message,
                            "chanel": data.chanel
                        }));
                    }
                    break;
            }
        }
    });

    connection.on('close', function (connection) {
        // close user connection
    });
})
;


//module.exports = chatModule;
