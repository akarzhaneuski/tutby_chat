var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var chatModule = require('./chat_module');
var app = express();

var connection = mysql.createConnection({
    user: "root",
    password: "root",
    database: "tutby_chat",
    port: "3306",
    host: "localhost"
});
connection.connect(function (err) {
    if (err != null) {
        console.log("Error connecting to mysql");
    }
    else {
        console.log("Connected to mysql");
    }
    // connected! (unless `err` is set)
});

/// claster node js

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/views', express.static(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({secret: 'MISHADOLBOEB'}));
app.use(app.router);

function checkAuth(req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.redirect('/login');
    }
}
app.get('/', function (req, res) {
    res.redirect('/main');
});
app.get('/main',  function (req, res) {
    res.render('main');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/registration', function (req, res) {
    res.render('registration');
});
app.post('/login', function (req, res) {
    var user = req.body.user;
    var password = req.body.password;
    var hash_password = crypto.createHash('sha1').update(password).digest('hex');
    ;
    var sql = "SELECT password,id FROM users WHERE login = ?";
    connection.query(sql, [user], function (err, results) {
        if (results[0] == undefined) {
            console.log("Login failure for %s!", user);
            res.redirect('/login');
        } else {
            if (results[0].password == hash_password) {
                req.session.user_id = results[0].id;
                console.log("Login success for %s!", user);
                res.redirect('/main');
            } else {
                console.log("Login failure for %s!", user);
                res.redirect('/login');
            }
        }
    });
});
app.post('/registration', function (req, res) {
    var user = req.body.user;
    var password = req.body.password;
    var hash_password = crypto.createHash('sha1').update(password).digest('hex');
    var sql = "SELECT login FROM users WHERE login = ? ";
    connection.query(sql, [user], function (err, results) {
        if (results[0] == undefined) {
            var sql = "INSERT INTO users(login,password)  VALUES( ?,? )";
            connection.query(sql, [user, hash_password], function (err, results) {
            });
            console.log('Registration success for %s!', user);
            res.redirect('/login');
        } else {
            console.log('Registration failure for %s!', user);
            res.redirect('/registration');
        }
    });

});
app.get('/logout', function (req, res) {
    req.session.user_id = undefined;
    res.redirect('/login');
});

app.get('/about', function (req, res) {
    console.log('tezt');
    res.render('about');
});
// САШИН КОД НАЧАЛСЯ
app.get('/set_online', function (req, res) {
    connection.query("update users set status=1 where id=1 ;", function (err, rows) {
        // There was a error or not?
        if (err != null) {
            res.end("Query error:" + err);
            connection.end();
        } else {
            // Shows the result on console window
            console.log("Status changed on online");
        }
    });
    console.log('now im online');
});
app.get('/set_out', function (req, res) {
    connection.query("update users set status=2 where id=1 ;", function (err, rows) {
        // There was a error or not?
        if (err != null) {
            res.end("Query error:" + err);
            connection.end();
        } else {
            // Shows the result on console window
            console.log("Status changed on away");
        }
    });
    console.log('now im out');
});
app.get('/set_busy', function (req, res) {
    connection.query("update users set status=3 where id=1 ;", function (err, rows) {
        // There was a error or not?
        if (err != null) {
            res.end("Query error:" + err);
            connection.end();
        } else {
            // Shows the result on console window
            console.log("Status changed on busy");
        }
    });
    console.log('now im busy');
});
app.get('/set_offline', function (req, res) {
    connection.query("update users set status=4 where id=1 ;", function (err, rows) {
        // There was a error or not?
        if (err != null) {
            res.end("Query error:" + err);
            connection.end();
        } else {
            // Shows the result on console window
            console.log("Status changed on offline");
        }
    });
    console.log('now im offline');
});
//Сашин код закончился

app.get('/showUserDialog', function (req, res) {
    var userName = 'Not found';
    var id = parseInt(req.query.userId, 10);
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
});

app.listen(process.env.PORT || 8080);
