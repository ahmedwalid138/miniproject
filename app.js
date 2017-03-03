var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('./routes/users');
var session = require('express-session');
var config = require('./config/database');
var work = require('./models/work');
var user = require('./models/user');
var app = express();
mongoose.connect(config.database)


mongoose.connection.on('connected', function(){
	console.log('connected to database' + config.database);
});
mongoose.connection.on('error', function(err){
	console.log('database error' + err);
});

app.use(function(req,res,next){
    res.locals.works = null;
    next();
});

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"secreeettttt",resave:false,saveUninitialized:true}));
app.use('/users',users);
app.get('/',function(req,res){
	res.render('homepage.ejs');
});




app.listen(3000, function(){
	console.log('Server started on port 3000');
})