var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql')
var router = require('./router/index')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

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

//Session
app.use(session({
    secret: 'keyboard cat', //Other String can put
    resave: false,
    saveUninitialized: true
  }))
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());

app.set('views', __dirname+'/public/views');
app.set('view engine', 'ejs');


app.use(router)
