var users = [];


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
        //console.log(users);
    }
}

exports.getAllUsersByChanel = function (chanel) {
    var ret = [];
    var length = users.length;
    for (var i = 0; i < length; ++i) {
        if (users[i].chanel == chanel) {
        }
        ret.push(users[i].connection);
    }
    return ret;
}