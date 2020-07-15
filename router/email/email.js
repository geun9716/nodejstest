var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host    : 'localhost',
    port    : '3306',
    user    : 'root',
    password : '1234',
    database : 'jsman'
})

connection.connect();

router.post('/form', function(req, res){
    //get : req.param('email')
    //res.send("welcom "+req.body.email)
    res.render('email.ejs', {'email' : req.body.email})
});

router.post('/ajax', function(req, res){
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from users where email ="'+email+'"', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].name;
            console.log(rows[0].name);
        } else{
            responseData.result = "none";
            responseData.name = "";
        }
        res.json(responseData)
    });
});

module.exports = router;