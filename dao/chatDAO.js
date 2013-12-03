var chatMessages = [];

chatMessages.push({
    user: 'Petya',
    message: 'Hi, VASYA!',
    chanel: 1
});

exports.addMessage = function (mess, chanel, user) {
    console.log("chatDAO: add message to storage");
    chatMessages.push({
        user: user,
        message: mess,
        chanel: chanel
    });
    //console.log(chatMessages);
}
exports.getLength = function () {
    console.log("chatDAO: get current length");
    return chatMessages.length;
}

exports.getMessagesByChanel = function (chanel) {
    console.log("chatDAO: get messages by chanel");
    var ret = [];
    var length = chatMessages.length;
    for (var i = 0; i < length; ++i) {
        if (chatMessages[i].chanel == chanel) {
            ret.push(chatMessages[i]);
        }
    }
    return ret;
}