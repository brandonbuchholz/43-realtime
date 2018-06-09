'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let CLICKS = 0;
let TICK_INTERVAL;
  
io.on('connection', function(socket){
  socket.emit('click-total', {clicks: CLICKS});
  console.log('a user connected');
  socket.on('send-click', () => {
    console.log('got "send-click event"', CLICKS++);
    io.emit('click-total', {clicks: CLICKS});
  });

  if (!TICK_INTERVAL) {
    TICK_INTERVAL = setInterval(() => {
      console.log('tick');
      io.emit('tick', {currentTime: Date.now().toString()});
    }, 1000);
  }
});

const Bundler = require('parcel-bundler');
const bundler = new Bundler('./public/index.html');
app.use(bundler.middleware());

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});