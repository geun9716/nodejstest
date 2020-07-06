var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.listen(3000, function(){
    console.log("start!! express server on port 3000");
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.set('views', __dirname+'/public/views');
app.set('view engine', 'ejs');

//url routing
app.get('/', function(req,res){
    res.sendFile(__dirname+"/public/main.html")
});

app.get('/main', function(req, res){
    res.sendFile(__dirname+"/public/main.html")
});

app.post('/email_post', function(req, res){
    //get : req.param('email')
    //res.send("welcom "+req.body.email)
    res.render('email.ejs', {'email' : req.body.email})
});

app.post('/ajax_send_email', function(req, res){
    var responseData = {'result' : 'ok' , 'email' : req.body.email};
    res.json(responseData)
});