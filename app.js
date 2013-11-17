
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var cat = require('./routes/cat');
var player = require('./routes/player');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

// init database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/snapcat');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('snap that kitty!'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var id = /[\da-f]/i;

// default page
app.get('/', routes.index);

// cat urls
app.get('/cats', cat.getCats(db));
app.get('/cat/:id', cat.getCat(db));
app.put('/cat/', cat.createCat(db));
app.put('/cat/:id', cat.updateCat(db));
app.delete('/cat/:id', cat.deleteCat(db));

// player urls
app.get('/players', player.getPlayers(db));
app.get('/player/:id', player.getPlayer(db));
app.put('/player', player.createPlayer(db));
app.put('/player/:id', player.updatePlayer(db));
app.delete('/player/:id', player.deletePlayer(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
