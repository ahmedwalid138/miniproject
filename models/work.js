var mongoose = require('mongoose');
var config = require('../config/database');

//user schema
var workSchema = mongoose.Schema({
	
	username: {
		type:String ,
		required: true
	},
	
	title:{
		type:String,
		required:true
	},

	URL:{
		type:String,
		required:true
	}
});

var works = module.exports = mongoose.model('works',workSchema);

module.exports.addWork = function(newWork, callback){
 newWork.save(callback);
 }


