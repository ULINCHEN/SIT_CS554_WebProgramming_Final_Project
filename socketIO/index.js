const express = require('express');
const app = express();
const server = require('http').createServer(app);
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
  console.log('a user connected');

  socket.join('1');
  console.log('Joined default channel 1');

  // 监听 join 消息
  socket.on('join', (channel) => {
    // 断开之前的频道
    socket.leaveAll();

    // 加入新频道
    socket.join(channel);
    console.log(`Client ${socket.id} joined ${channel}.`);
  });

  // 监听 leave 消息
  socket.on('leave', (channel) => {
    socket.leave(channel);
    console.log(`Client ${socket.id} left ${channel}.`);
  });

    socket.on('message', (data) => {
        console.log("get data from client =>", data);
        io.emit('message', data);
    })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});


