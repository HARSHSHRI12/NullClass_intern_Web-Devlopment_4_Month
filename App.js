import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import Chat from './components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container mt-5">
      <h1>Video Player with Quality Options</h1>
      <VideoPlayer />
      <h1 className="mt-5">Private Room Chat</h1>
      <Chat />
    </div>
  );
}

export default App;
