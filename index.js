var express = require('express');
var mysql      = require('mysql');
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
app.use(express.cookieParser('keyboard cat'));
app.use(express.session());
app.use(app.router);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'hello'
});

function checkAuth(req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.redirect('/login');
    }
}
app.get('/main',checkAuth, function (req, res) {
    res.render('main');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/',checkAuth, function (req, res) {
    res.redirect('/main');
});
app.post('/login', function (req, res) {
    var user = req.body.user;
    var password =req.body.password;
    var sql = "SELECT id FROM tutby_chat.users WHERE login = "+connection.escape(user)+
        " AND password = "+connection.escape(password);

    var query=connection.query(sql, function(err, results) {
        var resvalue;
        if(results[0] == undefined){
            resvalue=0;
        }else{
            resvalue=results[0].id;
        }
        if (resvalue>0 ) {
            console.log('login yes');
            req.session.user_id = resvalue;
            res.redirect('/main');
        } else {
            console.log('login no');
            res.redirect('/login');
        }
    });
});
app.post('/registration',function(req, res){
    var user = req.body.user;
    var password =req.body.password;

    var sql = "SELECT login FROM tutby_chat.users WHERE login ="+connection.escape(user);
    console.log('reg 1');
    connection.query(sql, function(err, results) {
        var exists = (results.length!=0);
        var message;
        if(exists){
            console.log('reg no');
            message = "User already exists!";
        } else {
            var sql = "INSERT INTO tutby_chat.users(login,password)  VALUES( " + connection.escape(user) +
                ", "+ connection.escape(password)+")";
            connection.query(sql, function(err, results) {
                console.log("ok insert");
            });
            console.log('reg yes');
        }
        res.redirect('/login');
    });

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