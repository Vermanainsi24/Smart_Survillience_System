import { useState } from "react";
import { FaExpand, FaVideoSlash } from "react-icons/fa";

export default function LiveFeed() {

  const [isOnline, setIsOnline] = useState(true);

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

    </div>
  );
}