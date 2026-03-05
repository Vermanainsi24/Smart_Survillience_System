import { motion } from "framer-motion";
import { FaExclamationTriangle, FaVideo, FaPercentage, FaClock } from "react-icons/fa";

export default function AlertCard({ alert, onDismiss, onView }) {

  if (!alert) return null;

  const eventName = alert.event || "Unknown Event";

  const isCritical =
    eventName.toLowerCase().includes("weapon") ||
    eventName.toLowerCase().includes("fire");

  const confidence = alert.confidence
    ? (alert.confidence * 100).toFixed(0)
    : "N/A";

  const formattedTime = alert.timestamp
    ? new Date(alert.timestamp).toLocaleString()
    : "Unknown time";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`alert-card-saas ${isCritical ? "critical" : "warning"}`}
    >
      <div className="card-glow"></div>

      {/* HEADER */}
      <div className="card-header">
        <div className="event-group">
          <FaExclamationTriangle className="alert-icon" />
          <h3>{eventName}</h3>
        </div>

        <div className="status-badge">
          <span className="pulse-dot"></span>
          LIVE
        </div>
      </div>

      {/* BODY */}
      <div className="card-body">
        <div className="info-row">

          <div className="info-item">
            <FaVideo />
            <small>Camera</small>
            <span>{alert.camera_id || "CAM-01"}</span>
          </div>

          <div className="info-item">
            <FaPercentage />
            <small>Confidence</small>
            <span className="confidence-text">{confidence}%</span>
          </div>

        </div>

        <div className="time-footer">
          <FaClock />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="card-actions">
        <button
          className="btn-view"
          onClick={() => onView && onView(alert)}
        >
          View Feed
        </button>

        <button
          className="btn-dismiss"
          onClick={() => onDismiss && onDismiss(alert)}
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}