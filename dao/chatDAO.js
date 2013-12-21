var mysql = require('mysql');
var chatMessages = [];

var mysql_connection = mysql.createConnection({
    user: "root",
    password: "root",
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

exports.addMessage = function (mess, chanel, user) {
//    console.log("chatDAO: add message to storage");
    var sql = "INSERT INTO messeges (user,id_conference, message) VALUES (?,?,?)";
    chanel = parseInt(chanel);
    mysql_connection.query(sql, [user, chanel, mess], function (err, results) {
    });
//    chatMessages.push({
//        user: user,
//        message: mess,
//        chanel: chanel
//    });
    //console.log(chatMessages);
}
exports.getLength = function () {
//    console.log("chatDAO: get current length");
    return chatMessages.length;
}

exports.getMessagesByChanel = function (chanel, callback) {
//        console.log("chatDAO: get messages by chanel");
    var sql = "SELECT user,message,id_conference AS chanel  FROM messeges WHERE id_conference=?";
    mysql_connection.query(sql, [chanel], callback);
//    var ret = [];
//    var length = chatMessages.length;
//    for (var i = 0; i < length; ++i) {
//        if (chatMessages[i].chanel == chanel) {
//            ret.push(chatMessages[i]);
//        }
//    }
//    return ret;
}

