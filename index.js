var express = require('express');
var app = express();
var chatModule = require('./chat_module');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/views', express.static(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded());


app.use(app.router);

app.get('/', function (req, res) {
    res.render('index2');
});

/*function loadUser(req, res) {

    var user = users[req.params.id];
    if (user) {
        req.user = user;
    }
}

app.get('/user/:id', loadUser, function(req, res){
    var d = Date.now();
    res.send(d);
    res.send('Viewing user ' + req.user.username);
});

*/
app.get('/enter', function (req, res) {
    console.log(req.params);
    res.render('index');
});
app.get('/about', function (req, res) {
    console.log('tezt');
    res.render('about');
});


app.get('/azaza', function(req, res){
    var d= Date.now();
    console.log(d);
    res.send(d.toString());
});

app.post('/showUserDialog', function (req, res) {
    var userName = 'Not found';
    var id = parseInt(req.body.userId,10);
// Получение инфы  о юзере
    switch (id) {
        case 1:
            userName = 'Meepo';
            break;
        case 2:
            userName = 'Timbersaw';
            break;
        case 3:
            userName = 'Antimage';
            break;
        case 4:
            userName = 'Batrider';
            break;
        case 5:
            userName = 'Invoker';
            break;
    }
    res.send({"userName": userName, "status": 'online', "image": 'def_user'});
    res.end();
});

function pair(first, second) {
    var first;
    var second;
    this.first = first;
    this.second = second;
}

clientManager = new function () {
    var clients = [];
    this.registerClient = function (client, conference) {
        // check in session if this user already listen this conference
        // if this user don't listen this conference
        clients.push(new pair(client, conference));
        // push to session conference
    }

    this.sendMessage = function (message, conference) {
        for (var i = 0; i < clients.length; ++i) {
            var client = clients[i];
            if (client.second == conference) {
                client.send({"hello": 'hello!'});
                client.end();
            }
        }
    }
}

// start listen chat
// if user !== udentifier => call function from user list
// else from confirecne list? and use cofirence params
app.post('/listenChat', function (req, res) {
    // check roles!!
    clientManager.registerClient(res);
});

app.get('/sendMessage', function (req, res) {
    clientManager.sendMessage();
    res.end();
});

app.listen(8080);