// modules =================================================
var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./config/db');
var morgan = require('morgan');
var session = require('express-session');
var http = require('http').Server(app);

var io = require('socket.io')(http);

// cloudinary.config({
//   cloud_name: 'salmansajid',
//   api_key: '667791922694642',
//   api_secret: 'gubRIXOJ7johvGe_ZP_D0LC93dc'
// });


var port = process.env.PORT || 8080; // set our port


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(express.static(path.join(__dirname, 'public')));     
// app.use(morgan('dev'));                                             
// app.use(methodOverride());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, './public')));

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


require('./config/routes.js')(app);

// connect to our mongoDB database (commented out after you enter in your own credentials)
mongoose.connect(db.url, function (err, res) {
  if (!err) {
    console.log("We are connected on local");
  }
  else {
    console.log(err);
  }
});

  app.get('*', function (req, res) {
        res.sendfile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
// start app ===============================================


http.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app



