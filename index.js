var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));



app.use(app.router);

app.get('/', function (req, res) {
    res.render('index2');
});

app.get('/enter', function(req, res){
    res.render('index');
});
app.listen(8080);