
/*
 * GET home page.
 */
var mongoose = require('mongoose');

var intitTweets;
var rankingData;

mongoose.connect('mongodb://localhost/fanOcesa');
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectID;

var TeewtSchema = new Schema({
	userId: Number,
	twweetId : Number,
	createdAt: Date,
	cuerpo: String,
	nameUser: String,
	location: String,
	avatar: String,
	user: String
});

var Teewt = mongoose.model('Teewt', TeewtSchema);

Teewt.find({}).limit(10).sort('-_id').exec(function(err, docs){
	intitTweets = docs;
});

Teewt.aggregate(
	{$project : {cuerpo : 1, userId:1, user:1  }}
  , {$group: { _id:{ id:"$userId", user: "$user"}, nTweets: { $sum: 1 }}}
  , {$sort : { nTweets : -1 }}
  , {$limit : 10}
  , function(err, data){
		rankingData = data;
});



exports.index = function(req, res){
	res.render('index', { 
		docs: intitTweets,
		ranking : rankingData
	});
};