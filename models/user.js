var mongoose = require('mongoose');
var config = require('../config/database');

//user schema
var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type:String ,
		required: true,
		unique: true
	},
	email: {
		type:String,
		required: true
	},
	password:{
		type:String,
		required:true
	}
});

var user = module.exports = mongoose.model('user',userSchema);

module.exports.addUser = function(newUser, callback){
 newUser.save(callback);
 }

