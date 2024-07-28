const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Adjust the origin to match your client-side URL
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

// Store room passwords in-memory for this example
const rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createRoom', ({ room, password }) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      rooms[room] = { password: hash };
      socket.join(room);
      io.to(room).emit('message', { user: 'admin', text: `${socket.id} has created the room!` });
    });
  });

  socket.on('joinRoom', ({ room, password }) => {
    if (rooms[room]) {
      bcrypt.compare(password, rooms[room].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          socket.join(room);
          io.to(room).emit('message', { user: 'admin', text: `${socket.id} has joined the room!` });
        } else {
          socket.emit('message', { user: 'admin', text: 'Incorrect password' });
        }
      });
    } else {
      socket.emit('message', { user: 'admin', text: 'Room does not exist' });
    }
  });

  socket.on('sendMessage', ({ message, room, password }) => {
    if (rooms[room]) {
      bcrypt.compare(password, rooms[room].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          io.to(room).emit('message', { user: socket.id, text: message });
        } else {
          socket.emit('message', { user: 'admin', text: 'Incorrect password' });
        }
      });
    } else {
      socket.emit('message', { user: 'admin', text: 'Room does not exist' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
