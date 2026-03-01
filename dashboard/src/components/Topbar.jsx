import { useEffect, useState } from "react";
import { FaClock, FaSatellite, FaUserShield } from "react-icons/fa";

export default function Topbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="topbar">
      <div class="topbar-left">
        <div className="title-group">
          <h3>Control Room Dashboard</h3>
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span>Live Analytics System</span>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <div className="system-stats">
          <div className="stat-item">
            <FaSatellite className="stat-icon" />
            <span>HQ-Alpha</span>
          </div>
          <div className="stat-item clock-box">
            <FaClock className="stat-icon" />
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </div>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">Lead Supervisor</span>
          </div>
          <div className="avatar-shield">
             <FaUserShield />
          </div>
        </div>
      </div>
    </header>
  );
}