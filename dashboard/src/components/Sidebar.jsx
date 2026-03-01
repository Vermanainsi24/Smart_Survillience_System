import { FaVideo, FaShieldAlt, FaFire, FaChartLine, FaCog } from "react-icons/fa";

export default function Sidebar({ alerts }) {
  return (
    <div className="sidebar">
      <div className="brand-area">
        <div className="brand-icon">🛡</div>
        <h2 className="brand-name">SAFE SIGHT</h2>
      </div>

      <nav className="nav-menu">
        <div className="nav-section">Monitoring</div>
        <button className="nav-item active">
          <FaVideo className="glass-icon blue" />
          <span>Live Feed</span>
          <span className="live-pulse"></span>
        </button>
        <button className="nav-item">
          <FaShieldAlt className="glass-icon amber" />
          <span>Weapon Alerts</span>
        </button>
        <button className="nav-item">
          <FaFire className="glass-icon red" />
          <span>Fire Alerts</span>
        </button>

        <div className="nav-section">System</div>
        <button className="nav-item">
          <FaChartLine className="glass-icon gray" />
          <span>Analytics</span>
        </button>
        <button className="nav-item">
          <FaCog className="glass-icon gray" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-divider"></div>

      <div className="recent-alerts-container">
        <h4 className="recent-title">Recent Incidents</h4>
        <div className="recent-alerts">
          {alerts.length === 0 ? (
            <p className="no-alerts">System Clear</p>
          ) : (
            alerts.slice(0, 5).map((alert, index) => (
              <div key={index} className="recent-alert-item">
                <div className={`status-glow ${alert.event.toLowerCase().includes('fire') ? 'fire' : 'shield'}`}></div>
                <div className="alert-text">
                  <p className="recent-event">{alert.event}</p>
                  <small className="camera-tag">{alert.camera_id}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}