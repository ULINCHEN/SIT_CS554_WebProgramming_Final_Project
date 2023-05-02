const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { getTimeStamp } = require('./helper');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST']
  }
});



app.get('/', (req, res) => {
  res.send('<h1>This is socketIO server</h1>');
});


io.on('connection', (socket) => {
  console.log('a user connected , time => ', getTimeStamp());

  // socket.join('1');
  // console.log('Joined default channel 1', "time => ", getTimeStamp());

  // 监听 join 消息
  socket.on('join', (channel) => {
    // 断开之前的频道
    socket.leaveAll();

    // 加入新频道
    socket.join(channel);
    console.log(`Client ${socket.id} joined ${channel}, time => `, getTimeStamp());
  });

  // 监听 leave 消息
  socket.on('leave', (channel) => {
    socket.leave(channel);
    console.log(`Client ${socket.id} left ${channel}, time => `, getTimeStamp());
  });

  // 监听 message 消息
  socket.on('message', (data) => {
    console.log("get data from client =>", data, "time => ", getTimeStamp());

    console.log("current socket room =>", socket.rooms);
    let roomId = Array.from(socket.rooms)[0];
    console.log("socket.rooms =>", roomId);
    io.to(roomId).emit('message', data);
    // socket.to(roomId).emit('message', data);
    // socket.broadcast.to(roomId).emit('message', data);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', "time => ", getTimeStamp());
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});


