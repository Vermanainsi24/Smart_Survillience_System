import { FaVideo, FaShieldAlt, FaFire, FaChartLine, FaCog } from "react-icons/fa";

export default function Sidebar({ alerts = [] }) {

  const weaponAlerts = alerts.filter(a =>
    a.event?.toLowerCase().includes("weapon")
  ).length;

  const fireAlerts = alerts.filter(a =>
    a.event?.toLowerCase().includes("fire")
  ).length;

  return (
    <div className="sidebar">

      {/* Brand */}
      <div className="brand-area">
        <div className="brand-icon">🛡</div>
        <h2 className="brand-name">SAFE SIGHT</h2>
      </div>

      {/* Navigation */}
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

          {weaponAlerts > 0 && (
            <span className="alert-count">{weaponAlerts}</span>
          )}
        </button>

        <button className="nav-item">
          <FaFire className="glass-icon red" />
          <span>Fire Alerts</span>

          {fireAlerts > 0 && (
            <span className="alert-count">{fireAlerts}</span>
          )}
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

      {/* Recent Alerts */}
      <div className="recent-alerts-container">

        <h4 className="recent-title">Recent Incidents</h4>

        <div className="recent-alerts">

          {alerts.length === 0 ? (
            <p className="no-alerts">System Clear</p>
          ) : (
            alerts.slice(0, 5).map((alert, index) => {

              const isFire = alert.event?.toLowerCase().includes("fire");

              return (
                <div key={index} className="recent-alert-item">

                  <div className={`status-glow ${isFire ? "fire" : "shield"}`}></div>

                  <div className="alert-text">
                    <p className="recent-event">{alert.event}</p>

                    <small className="camera-tag">
                      {alert.camera_id || "CAM-01"}
                    </small>
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
}