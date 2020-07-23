var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    : 'localhost',
    port    : '3306',
    user    : 'root',
    password : '1234',
    database : 'jsman'
})

connection.connect();

router.get('/list', function(req, res){
    res.render('movie.ejs');
});

// 1. /movie , GET
router.get('/', function(req, res){
    var responseData = {};

    var query = connection.query('select title from movie', function(err, rows){
        if(err) throw err;
        if(rows.length){
            responseData.result = 1;
            responseData.data = rows;
            console.log(rows);
        } else{
            responseData.result = 0;
        }
        res.json(responseData)
    });
});
// 2. /movie, POST
router.post('/', function(req, res){
    var title = req.body.title;
    var type = req.body.type;
    var grade = req.body.grade;
    var actor = req.body.actor;

    var query = connection.query('select * from movie where title=?', [title] , function(err, rows){
        if(err) return done(err);
        if(rows.length){
            console.log('movie existed')
            return res.json({'result' : 0});
        } else{
            var sql = {title, type, grade, actor};
            var query = connection.query('Insert into movie set ?', sql, function(err, rows){
                if(err) throw err;
                return res.json({'result' : 1});
            })
        }
    })
})

// 3. /movie/:title ,GET
router.get('/:title', function(req,res){
    var title = req.params.title;
    var responseData = {};
    console.log(title);

    var query = connection.query('select * from movie where title=?',[title], function(err, rows){
        if(err) throw err;
        if(rows[0]){
            responseData.result = 1;
            responseData.data = rows;
            console.log(rows);
        } else{
            responseData.result = 0;
        }
        res.json(responseData)
    });
})

router.delete('/:title', function(req, res){
    var title = req.params.title;
    var responseData = {};
    console.log(title);

    var query = connection.query('delete from movie where title=?',[title], function(err, rows){
        if(err) throw err;
        console.log(rows);
        if(rows.affectedRows > 0){
            responseData.result = 1;
            responseData.data = title;
            console.log(rows);
        } else{
            responseData.result = 0;
        }
        res.json(responseData)
    });
})



module.exports = router;
