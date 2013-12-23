var WebSocketServer = require('websocket').server;
var http = require('http');
var chatDAO = require('./dao/chatDAO');
var userChatDAO = require('./dao/userChatDAO');
var mysql = require('mysql');

var webSocketsServerPort = 1337;

var users = [];

var userId;

var mysql_connection = mysql.createConnection({
    user: "root",
    password: "GitHub", // Ilya's password
 //   password: "hello",
    database: "tutby_chat",
    port: "3306",
    host: "localhost"
});
mysql_connection.connect(function (err) {
    if (err != null) {
        console.log("Error connecting to mysql");
    } else {
        console.log("Connected to mysql");
    }
    // connected! (unless `err` is set)
});

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

    var userid;
    for (var i = 0; i < request.cookies.length; ++i) {
        if (request.cookies[i].name == "user_id") {
            userid = parseInt(request.cookies[i].value);
        }
    }

//    connection.sendUTF(JSON.stringify({name: 'Vasya' }))
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            var data = JSON.parse(message.utf8Data);
            userChatDAO.updateUserActivity(userId);
            //console.log(data.type);
            switch (data.type) {
                case 'listen':
                    var chanel = parseInt(data.userId);
                    // start listen chanel
                    // ПРОВЕРКА ПРАВ!!
                    // take username from session
                    userChatDAO.addNewListener(chanel, userid, connection);
                    chatDAO.getMessagesByChanel(chanel, function (err, results) {
                        connection.sendUTF(JSON.stringify({
                            "type": "showMessages",
                            "data": results
                        }));
                    });
                    break;
                case 'sendMessage' :
                    var sql = "SELECT login FROM users WHERE id=?";
                    mysql_connection.query(sql, [userid], function (err, results) {
                        var login;
                        console.log("send message");
                        // проверить права + логин из сессии
                        var lt = /</g,
                            gt = />/g,
                            ap = /'/g,
                            ic = /"/g;
                        data.message = data.message.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
                        chatDAO.addMessage(data.message, data.chanel, results[0].login);
                        // отправить всем кроме этого юзера, дописать
                        var chanelUsers = userChatDAO.getAllUsersByChanel(parseInt(data.chanel));
                        for (var i = 0; i < chanelUsers.length; ++i) {
                            login = results[0].login;
                            chanelUsers[i].sendUTF(JSON.stringify({
                                "type": "newChanelMessage",
                                "user": login,
                                "message": data.message,
                                "chanel": data.chanel
                            }));
                        }
                    });
                    break;
                case 'findFriensReq':
                    userChatDAO.getUsersLikeLogin(data.login, function (err, result) {
                        connection.sendUTF(JSON.stringify({
                            "type": "findFriends",
                            "users": result
                        }));
                    });
                    break;
            }
        }
    });

    connection.on('close', function (connection) {
        // close user connection
    });
});


module.exports = hello = function (id) {
    userId = id;
};
