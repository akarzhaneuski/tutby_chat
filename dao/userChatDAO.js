var mysql = require('mysql');
var users = [];

var mysql_connection = mysql.createConnection({
    user: "root",
   // password: "hello",
    password: "GitHub", // Ilya's password
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

function isExistsListener(chanel, user) {
    var length = users.length;
    for (var i = 0; i < length; ++i) {
        if (users[i].chanel == chanel && users[i].user == user) {
            return true;
        }
    }
    return false;
}

exports.addNewListener = function (chanel, user, connection) {
    if (!isExistsListener(chanel, user)) {
        users.push({
            chanel: chanel,
            user: user,
            connection: connection
        });
//        console.log(users);
    }
}

exports.getAllUsersByChanel = function (chanel) {
    var ret = [];
    var length = users.length;
    for (var i = 0; i < length; ++i) {
        if (users[i].chanel == chanel) {
            ret.push(users[i].connection);
        }
    }
    return ret;
}

exports.updateUserActivity = function (id) {
    var sql = "UPDATE users SET last_activity=now() WHERE id=?";
    mysql_connection.query(sql, [id], function (err, results) {
    });
}










