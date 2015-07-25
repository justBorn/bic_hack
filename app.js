/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
};



/* Init Mongoose schema */
var mongodb_schema = require('./database/v0/index');
mongodb_schema.init();


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)


var register_socket = require('./sockets');

var logger = require('./sockets/v0/logger');
var example = require('./sockets/v0/examples');
var door = require('./sockets/v0/door');
var machines = require('./sockets/v0/machines');

register_socket.add(logger);
register_socket.add(example);
register_socket.add(door);
register_socket.add(machines);
var _socket;
io.sockets.on('connection', function(socket){
    _socket = socket;
    register_socket.register(app)(socket)
});


app.get('/api/profile',function(){
    _socket.emit('goto:profile');
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nfc');


app.get('*', routes.index);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
