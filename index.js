var express = require('express');
var app = express();

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


app.get('/enter', function (req, res) {
    console.log(req.params);
    res.render('index');
});

app.post('/showUserDialog', function (req, res) {
    var userName = 'Not found';
    var id = 1*req.body.userId;
// Получение инфы  о юзере
    switch (id) {
        case 1: userName = 'Meepo';
            break;
        case 2: userName = 'Timbersaw';
            break;
        case 3: userName = 'Antimage';
            break;
        case 4: userName = 'Batrider';
            break;
        case 5: userName = 'Invoker';
            break;
    }
    res.send({"userName": userName, "status" : 'online', "image": 'def_user'});
    res.end();
});

app.listen(8080);