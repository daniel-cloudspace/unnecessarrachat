
/**
 * Module dependencies.
 */

var express = require('express')
  , socketio = require('socket.io')
  , eyes = require('eyes')
  , backbone = require('backbone') 
  , _ = require('underscore')



var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app)

// Express Configuration

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))
})

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

app.configure('production', function(){
  app.use(express.errorHandler())
})

// Express Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  })
})



// Socket.io Configuration
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


app.listen(8082)
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
