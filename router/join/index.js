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

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../../public/join.html'))
});

router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var password = body.password;

    var sql = {email : email, name : name, pw : password};

    //github mysqljs _ escaping reference
    var query = connection.query('insert into users set ?',sql,
        function(err, rows){
            if(err) {
                return err
            }
            else{
                res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
                console.log('ok db insert : ', rows , name)
            }
            
    });
})
module.exports = router;