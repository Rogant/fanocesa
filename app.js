
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var guardar = require('./routes/guardar');
var http = require('http');
var path = require('path');


var Teewt = require('mongoose').model('Teewt');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/guardar', guardar.guardar);
app.post('/guardar', guardar.guardar);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.emit('mensaje', { mensaje: 'estas en mi app'});
});


var Twit = require('twit');

var T = new Twit({
    consumer_key:         'BvC5HwMLa1e0BBea7fOQ',
    consumer_secret:      'cSvCszmVR4NHV3gmjtUuucWmL5paVoN9hCRY9lTxc4A',
    access_token:         '100617901-CwUlCD4bYqTHGOMiXF8bSIsLDeFDdRXjHxwjt7jT',
    access_token_secret:  'cVZT03mSDbxtms4SpWIkPloT3tIroXcXgiPqjpUd3es'
});


var stream = T.stream('statuses/filter', { track: ['js', 'nodejs', 'node', 'javascript'] });

stream.on('tweet', function (tweets) {

	T.get('friends/ids', { screen_name: tweets.user.screen_name },  function (err, reply) {
		//if(reply.ids.indexOf(tweets.user.screen_name))
		//{
			var guardar = new Teewt({ 
				userId: tweets.user.id,
				twweetId : tweets.id,
				createdAt: tweets.created_at,
				cuerpo: tweets.text,
				nameUser: tweets.user.name,
				location: tweets.user.location,
				avatar: tweets.user.profile_image_url,
				user: tweets.user.screen_name
			});

			guardar.save(function(err){
				console.log(err);
			});

			io.sockets.emit('newTweet', { 
				tweet: tweets.text,
				img: tweets.user.profile_image_url,
				user: tweets.user.screen_name,
				nombre: tweets.user.name
			});
		//}
	});
});