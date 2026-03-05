import { useEffect, useState } from "react";
import { FaHistory, FaVideo, FaSearch, FaDownload } from "react-icons/fa";

export default function AlertHistory({ type }) {
  // 1. Initialize state as an empty array [] to prevent .map() from crashing on undefined
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/alerts/history?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        // 2. Ensure the data is actually an array before updating state
        setAlerts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [type]);

  // 3. Professional Loading State: Prevents the .map() crash
  if (loading) {
    return (
      <div className="terminal-viewport">
        <div className="terminal-glass-card loading-center">
          <span className="pulse-dot"></span>
          <p className="loading-text">RETRIEVING {type?.toUpperCase()} ARCHIVES...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-viewport">
      <div className="terminal-glass-card">
        
        {/* Header Section */}
        <div className="terminal-header">
          <div className="title-group">
            <FaHistory className="accent-icon" />
            <h2>{type?.toUpperCase()} INCIDENT ARCHIVE</h2>
          </div>
          <div className="system-status">
            <span className="pulse-dot"></span>
            SECURE UPLINK ACTIVE
          </div>
        </div>

        {/* Forensic Action Bar */}
        <div className="action-bar">
  <div className="search-wrapper">
    <FaSearch className="search-icon" />
    <input 
      type="text" 
      className="terminal-search" 
      placeholder="Search by Camera ID or Timestamp..." 
    />
  </div>
  <button className="export-btn">
    <FaDownload /> EXPORT LOGS
  </button>
</div>

        {/* The "Command Center" Table */}
        <div className="table-container">
          <table className="terminal-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>SOURCE</th>
                <th>SEVERITY</th>
                <th>CONFIDENCE</th>
                <th>EVIDENCE</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Map only runs once alerts is populated and loading is false */}
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <tr key={index} className="terminal-row">
                    <td className="time-stamp">{alert.timestamp}</td>
                    <td className="source-info">
                      <FaVideo className="cam-icon" />
                      <span>{alert.camera_id}</span>
                    </td>
                    <td>
                      {/* Dark Badge Concept */}
                      <span className={`dark-badge ${alert.severity?.toLowerCase() || 'high'}`}>
                        {alert.severity || 'CRITICAL'}
                      </span>
                    </td>
                    <td className="confidence-cell">
                      <div className="glow-bar-bg">
                        <div className="glow-bar-fill" style={{ width: `${alert.confidence * 100}%` }}></div>
                      </div>
                      <span className="conf-value">{(alert.confidence * 100).toFixed(0)}%</span>
                    </td>
                    <td>
                      <div className="evidence-frame">
                        <img src={`http://localhost:8000/${alert.image}`} alt="Incident Snapshot" />
                        <div className="frame-id">CAM_REC_{index}</div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data-msg">No forensic data found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}