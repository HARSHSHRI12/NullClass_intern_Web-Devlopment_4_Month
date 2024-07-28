import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VideoPlayer = ({ videoLabel, videoSources, onVideoComplete }) => {
  const [quality, setQuality] = useState("320p");

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const videoSrc = videoSources[quality];

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{videoLabel}</h5>
          <div className="video-container mb-3">
            <video width="100%" controls onEnded={onVideoComplete}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mb-3">
            <label htmlFor={`qualitySelect-${videoLabel}`} className="form-label">
              Select Quality
            </label>
            <select
              id={`qualitySelect-${videoLabel}`}
              value={quality}
              onChange={handleQualityChange}
              className="form-select"
            >
              <option value="320p">320p</option>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  const [points, setPoints] = useState(0);

  const handleVideoComplete = () => {
    setPoints(points + 5);
  };

  const videos = [
    {
      label: "Motivation of the world 🚀",
      sources: {
        "320p": "/public/videos/video1-320p.mp4",
        "480p": "/public/videos/video1-480p.mp4",
        "720p": "/public/videos/video1-720p.mp4",
        "1080p": "/public/videos/video1-1080p.mp4",
      },
    },
    {
      label: "Improve Your Communication 💻",
      sources: {
        "320p": "/public/videos/video2-320p.mp4",
        "480p": "/public/videos/video2-480p.mp4",
        "720p": "/public/videos/video2-720p.mp4",
        "1080p": "/public/videos/video2-1080p.mp4",
      },
    },
    {
      label: "Upskill with me in 15 min 🌐",
      sources: {
        "320p": "/public/videos/video2-320p.mp4",
        "480p": "/public/videos/video2-480p.mp4",
        "720p": "/public/videos/video2-720p.mp4",
        "1080p": "/public/videos/video2-1080p.mp4",
      },
    },
    {
      label: "Become a Profecinal men 💼",
      sources: {
        "320p": "/public/videos/video2-320p.mp4",
        "480p": "/public/videos/video2-480p.mp4",
        "720p": "/public/videos/video2-720p.mp4",
        "1080p": "/public/videos/video2-1080p.mp4",
      },
    },
    
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="./">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/About">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/check-Point">Check Points</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <h2 className="mb-4">Total Points: {points}</h2>
        <div className="row">
          {videos.map((video, index) => (
            <VideoPlayer
              key={index}
              videoLabel={video.label}
              videoSources={video.sources}
              onVideoComplete={handleVideoComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
