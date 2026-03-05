import { FaVideo, FaShieldAlt, FaFire, FaChartLine, FaCog, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ alerts = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic alert counts for forensic badges
  const weaponAlerts = alerts.filter(a => a.event?.toLowerCase().includes("weapon")).length;
  const fireAlerts = alerts.filter(a => a.event?.toLowerCase().includes("fire")).length;

  const isActive = (path) => location.pathname === path ? "active-nav" : "";

  return (
    <div className="terminal-sidebar-gradient">
      {/* Brand Identity with Glow */}
      <div className="sidebar-brand-aligned">
        <div className="brand-shield-glow">
          <FaShieldAlt />
        </div>
        <div className="brand-text-block">
          <h2>SAFE SIGHT</h2>
          <div className="system-status-mini">
            <span className="pulse-dot-green"></span>
            SECURE TERMINAL
          </div>
        </div>
      </div>

      <nav className="terminal-nav-shaded">
        <div className="nav-group-label">OPERATIONAL MONITORING</div>
        
        <button className={`nav-link-shaded ${isActive("/")}`} onClick={() => navigate("/")}>
          <div className="icon-wrapper blue-glow"><FaVideo /></div>
          <span>Live Surveillance</span>
        </button>

        <button className={`nav-link-shaded ${isActive("/alerts/weapon")}`} onClick={() => navigate("/alerts/weapon")}>
          <div className="icon-wrapper amber-glow"><FaLock /></div>
          <span>Weapon Archive</span>
          {weaponAlerts > 0 && <span className="terminal-badge-red">{weaponAlerts}</span>}
        </button>

        <button className={`nav-link-shaded ${isActive("/alerts/fire")}`} onClick={() => navigate("/alerts/fire")}>
          <div className="icon-wrapper red-glow"><FaFire /></div>
          <span>Fire Detection</span>
          {fireAlerts > 0 && <span className="terminal-badge-red">{fireAlerts}</span>}
        </button>

        <div className="nav-group-label">SYSTEM INTELLIGENCE</div>

        <button className={`nav-link-shaded ${isActive("/analytics")}`} onClick={() => navigate("/analytics")}>
          <div className="icon-wrapper indigo-glow"><FaChartLine /></div>
          <span>Threat Analytics</span>
        </button>

        <button className="nav-link-shaded">
          <div className="icon-wrapper slate-glow"><FaCog /></div>
          <span>Configurations</span>
        </button>
      </nav>

     <div className="sidebar-footer-elite">
  <div className="footer-separator"></div>
  <p>© 2026 <span>SafeSight AI</span></p>
  <div className="system-version">v2.4.0-STABLE</div>
</div>
    </div>
  );
}