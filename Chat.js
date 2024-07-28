import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const createRoom = () => {
    socket.emit('createRoom', { room, password });
    setIsInRoom(true);
  };

  const joinRoom = () => {
    socket.emit('joinRoom', { room, password });
    setIsInRoom(true);
  };

  const sendMessage = () => {
    socket.emit('sendMessage', { message, room, password });
    setMessage('');
  };

  return (
    <div className="chat-container container mt-5">
      {!isInRoom ? (
        <div className="room-form">
          <div className="mb-3">
            <label htmlFor="room" className="form-label">Room Name</label>
            <input
              type="text"
              id="room"
              className="form-control"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary me-2" onClick={createRoom}>Create Room</button>
          <button className="btn btn-secondary" onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div className="chat-room">
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <input
              type="text"
              id="message"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          <div className="mt-3 messages-container">
            <h5>Messages:</h5>
            <ul className="list-group">
              {messages.map((msg, index) => (
                <li key={index} className="list-group-item">
                  <strong>{msg.user}:</strong> {msg.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
