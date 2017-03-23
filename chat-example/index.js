var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var fs = require('fs');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


 app.get('/contact', function(req, res){
  res.render('contact');
});


var numUsers = 0;
var name = [];
var count = 0;
var counterr = 0;
var bool = false;

io.on('connection', function(socket){
  io.emit('chat message', "Hello this home : type '1' to talk or type '2' for info");

  // socket.on('private message', function (from, msg) {
  //   console.log('I received a private message by ', from, ' saying ', msg);
  // });



  socket.on('chat message', function(msg){

    if(msg === '1' && count === 0 ){
      io.emit('talk','do you like apple ?' );
      count = 1;

    }else if(msg === '2' && count === 0 ){
      io.emit('nav','this is info, type "contact" or  "profile"' );
      count = 2;

    }else if(msg == 'yes' && count === 1){
     io.emit('chat message', 'fruit or ios dude ?');
    }else if(msg == 'no' && count === 1){
     io.emit('chat message', 'try to like it maybe ?');
    }else if(msg == 'fruit' && count === 1){
     io.emit('chat message', 'you probably hungry, go eat then');
    }else if(msg == 'ios' && count === 1){
     io.emit('chat message', 'get a new one then.');
    }else if(count === 1 && counterr  != 3){
    io.emit('chat message', 'I do not understand what re u talking ?, do you want apple ?');
    counterr++;
    console.log('counterr '+ counterr);
    }else if(count ===1 && counterr === 3){
    io.emit('chat message', 'Error, move back to home:');
    io.emit('chat message', "Hello this home : type '1' to talk or type '2' for info");

    count = 0;
    }

    else if(msg === 'contact' && count === 2){
      io.emit('sorry still upgrading, you can link directly http://127.0.0.1:3000/contact above' );

    }else if(msg === 'profile' && count === 2){
      io.emit('profile is empty' );

    }else if(count === 2 && counterr  != 3){
    io.emit('chat message', 'Type 1 or 2 only please');
    counterr++;

  }else if(count === 2 && counterr === 3){
    io.emit('chat message', 'whatever you are send to home now');
    io.emit('chat message', "Hello this home : type '1' to talk or type '2' for info");

    count = 0;
    counterr = 0;
    }
    else if(msg == 'home' || counterr === 5){
      io.emit('chat message', "Hello this home : type '1' to talk or type '2' for info");

    count = 0;
    counterr = 0;

    }else{
    io.emit('chat message', 'Sorry I do not understand, type home to restart or press f5');
    counterr++;
    }


    // if(msg === '-contact'){
    //   console.log('contact-trigger');
    //   io.emit('chat message',cc);
    //
    // }else{
    //   io.emit('chat message', msg);
    //  }
  });

// console.log(count);


});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
