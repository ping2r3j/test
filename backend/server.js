var express = require('express');
var cors = require('cors');
var app = express();
var covid = require('novelcovid');
var path = require('path');
app.use(cors());
var port = process.env.PORT||3000;

app.use(express.static(__dirname + '/dist'));

var errHandler = function(err) {
    console.log(err);
}
app.get('/api/deathsAll',(req, res, next)=> {
    var dataPromise = covid.getAll();
    dataPromise.then(function(result) {
                    res.send(result);
                }, errHandler)
});
app.get('/',(req, res)=> {
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});
app.get('/api/deathsCountry',(req, res, next)=> {
    var dataPromise = covid.getCountry();
    dataPromise.then(function(result) {
                    res.send(result);
                }, errHandler)
});

app.listen(port);
