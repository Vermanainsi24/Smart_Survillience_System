import { useState } from "react";
import { FaExpand, FaVideoSlash } from "react-icons/fa";

export default function LiveFeed() {

  const [isOnline, setIsOnline] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cameraIP, setCameraIP] = useState("");

  // Start IP camera
  const startCamera = async () => {

    await fetch("http://localhost:8000/set-camera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source: cameraIP
      })
    });

    setShowModal(false);
  };

  // Switch back to demo video
  const useDemoVideo = async () => {

    await fetch("http://localhost:8000/set-camera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source: "test.mp4"
      })
    });

  };

  return (
    <div className="live-feed-viewport">

      <div className="feed-card-saas">

        <div className="feed-header">

          <div className="camera-info">
            <span className="pulse-dot"></span>
            <h3>PRIMARY FEED: CAM-01</h3>
          </div>

          <div className="feed-actions">
            <button className="icon-btn">
              <FaExpand />
            </button>
          </div>

        </div>

        <div className="video-wrapper">

          {isOnline ? (

            <img
              src="http://localhost:8000/video-feed"
              alt="Live Security Feed"
              className="live-video-stream"
              onError={() => setIsOnline(false)}
            />

          ) : (

            <div className="feed-offline">
              <FaVideoSlash />
              <p>CONNECTION LOST</p>
            </div>

          )}

        </div>

      </div>

      {/* Controls */}
       <div className="controls-center-wrapper">
  <div className="feed-controls">
    <button onClick={() => setShowModal(true)}>
      Live Inference
    </button>
    <button onClick={useDemoVideo}>
      Demo Video
    </button>
    <button onClick={() => startCamera("0")}>
      Use Webcam
    </button>
  </div>


      </div>

      {/* Camera Modal */}
      

      {showModal && (
  <div className="camera-modal-overlay">
    <div className="camera-modal-card">
      <h3>CONFIGURE LIVE INFERENCE</h3>
      
      <input
        type="text"
        placeholder="rtsp://192.168.1.100:554/stream"
        value={cameraIP}
        onChange={(e) => setCameraIP(e.target.value)}
      />

      <div className="modal-btn-group">
        {/* Start Camera with Brand Indigo Glow */}
        <button className="terminal-btn-primary" onClick={startCamera}>
          START UPLINK
        </button>
        <button className="terminal-btn-secondary" onClick={() => setShowModal(false)}>
          CANCEL
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}