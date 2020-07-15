var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql')
var router = require('./router/index')

var connection = mysql.createConnection({
    host    : 'localhost',
    port    : '3306',
    user    : 'root',
    password : '1234',
    database : 'jsman'
})

connection.connect();

app.listen(3000, function(){
    console.log("start!! express server on port 3000");
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.set('views', __dirname+'/public/views');
app.set('view engine', 'ejs');

app.use(router)
