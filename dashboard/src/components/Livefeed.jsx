import { useState, useEffect } from "react";
import { FaExpand, FaDotCircle, FaVideoSlash } from "react-icons/fa";

export default function LiveFeed() {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 100); // Higher frequency for smooth video feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-feed-viewport">
      <div className="feed-card-saas">
        
        <div className="feed-header">
          <div className="camera-info">
            <span className="pulse-dot"></span>
            <h3>PRIMARY FEED: CAM-01</h3>
          </div>
          <div className="feed-actions">
            <button className="icon-btn" title="Expand"><FaExpand /></button>
          </div>
        </div>

        <div className="video-wrapper">
          {isOnline ? (
            <img
              src={`https://your-ngrok-url.ngrok-free.dev/frame?t=${timestamp}`}
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
          
          <div className="feed-footer">
            <div className="bitrate-tag">1080p | 30 FPS</div>
            <div className="location-tag">Sector 7-G North</div>
          </div>
        </div>

      </div>
    </div>
  );
}