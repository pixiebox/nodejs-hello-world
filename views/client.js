var socket = io.connect('http://localhost');
var twitterlist = $('#twitter_list');

socket.on('tweet', function(tweet) {
	twitterlist.prepend('<p>' + tweet.text + '</p>');
});