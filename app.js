var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , hogan = require('hogan.js')
  , request = require('request')
  , testMiddleware = require('./middleware/testMiddleware');

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//configure routes
app.get('/', routes.index);
app.get('/test', testMiddleware.index, routes.test);

//configure optional debug information
if(process.env.DEBUG == 'true') {
  console.log("DEBUG ENABLED");
};

//initiate the app server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
