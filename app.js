//create our express app
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);

var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/index', function(req,res){
	res.render('index', { title: 'Batman\'s shoutbox' });

	var Twitter = require('node-twitter');
	var twitterStreamClient = new Twitter.StreamClient(
		'CONSUMER_KEY',
		'CONSUMER_SECRET',
		'TOKEN',
		'TOKEN_SECRET'
	);
	// get your own timeline
	/*
	twitterRestClient.statusesUserTimeline({}, function(error, result) {
		if (error)
		{
			console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
		}
	 
		if (result)
		{
			for(var i = 0; i < result.length; i++) {
				var obj = result[i];

				console.log(obj.text);
			}
		}
	});
	*/

	var watchList = ['batman'];
	var stream = twitterStreamClient.start(watchList);
	//stream
	twitterStreamClient.on('tweet', function(tweet) {
		io.emit('tweet', tweet);
	});
});
app.get("/client.js", function (req, res) {
    res.sendfile(__dirname + "/views/client.js");
});
