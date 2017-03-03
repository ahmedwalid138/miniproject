var express = require('express');
var router = express.Router();
var user = require('../models/user');
var work = require('../models/work');

router.post('/login', function(req,res)
{
	var username = req.body.username;
	var	password = req.body.password;

	user.findOne({username:username, password: password},function(err,student){
		if(err){
			return res.status(500).send();
		}

		if(!student){
			res.render('login.ejs', {
				error: 'Wrong username or password'

			});
			return;
		}
		req.session.user = student;
		res.redirect('/users/profile');
		
	});
});

router.get('/login', function(req,res){
	res.render('login.ejs', {
		error: ''
	});
})



//register
router.post('/register', function(req,res,next){
	var newUser = new user({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	user.addUser(newUser, function(err,user){
		if(err)
		{
			res.json({success:false,msg:'Failed to register user'});
		}
		else
		{
			res.json({success:true,msg:'User registered'});

		}
	});
});

//profile
router.get('/register', function(req,res,next){
	res.render('register.ejs');
});

router.get('/profile', function(req,res){
	if(!req.session.user)
		res.redirect('/users/login');
	
	var current = req.session.user.username;

	work.find({username:current},function(err,works){
	if(err){
		res.json({success:false,msg:'Failed to find works'});
	}
	else
	{
		var x = work.find({username:req.session.user});

		
			var name = req.session.user.username;
			res.render('portofolio', {works, 
			username: x
		});	
		
		
		
		
	}
	});
});


router.get('/upload', function(req,res,next){
	if(!req.session.user)
		res.redirect('/users/login');
	res.render('upload');
});

router.post('/upload', function(req,res,next){
	if(!req.session.user)
	{
		res.redirect('/users/login');
	}
	else
	{
		var username = req.session.user.username;
		var title = req.body.title;
		var URL = req.body.url;

		var newWork = new work({
			username: username,
			title: title,
			URL: URL
	});

	}
	
	work.addWork(newWork, function(err,output){
		if(err)
		{
			res.json({success:false,msg:'Failed to add work'});
		}
		else
		{
			res.redirect('/users/profile');
		}

		
		
	});

	
});

router.get('/summary', function(req,res,next){
	work.find({},function(err,output){
		if(err)
		{
			res.json({success:false,msg:'Failed to register user'});
		}
		else
		{
			res.render('summary',{output});
		}
	});
	
});




module.exports = router;