var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = module.exports = require('http').createServer(app);

var io = require('socket.io').listen(server);
var routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));


app.use('/',routes);
app.use('/scripts/jquery',express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/scripts/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/styles/jquery',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set('views',__dirname + '/views');
app.set('view engine','ejs');

var onconnect = require('./routes/sockets');
io.sockets.on('connection',onconnect);

app.use(function(err,req,res,next){
   res.status(err.status || 500);
      res.render('error', {
         message : err.message,
	 error : err
      });
   });

server.listen(3000);
module.exports = app;
		   
