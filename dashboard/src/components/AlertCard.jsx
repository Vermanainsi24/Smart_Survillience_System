import { motion } from "framer-motion";
import { FaExclamationTriangle, FaVideo, FaPercentage, FaClock } from "react-icons/fa";

export default function AlertCard({ alert }) {
  const isCritical = alert.event.toLowerCase().includes('weapon') || alert.event.toLowerCase().includes('fire');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`alert-card-saas ${isCritical ? 'critical' : 'warning'}`}
    >
      <div className="card-glow"></div>
      
      <div className="card-header">
        <div className="event-group">
          <FaExclamationTriangle className="alert-icon" />
          <h3>{alert.event}</h3>
        </div>
        <div className="status-badge">
          <span className="pulse-dot"></span>
          LIVE
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <div className="info-item">
            <FaVideo />
            <small>Camera</small>
            <span>{alert.camera_id}</span>
          </div>
          <div className="info-item">
            <FaPercentage />
            <small>Confidence</small>
            <span className="confidence-text">{(alert.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="time-footer">
          <FaClock />
          <span>{alert.timestamp}</span>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-view">View Feed</button>
        <button className="btn-dismiss">Dismiss</button>
      </div>
    </motion.div>
  );
}