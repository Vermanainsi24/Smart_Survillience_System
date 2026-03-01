import { motion } from "framer-motion";
import { FaChartBar, FaHourglassHalf, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function StatCard({ title, value, type }) {
  // Map types to specific icons and glow effects
  const iconMap = {
    total: { icon: <FaChartBar />, class: 'total-requests' },
    pending: { icon: <FaHourglassHalf />, class: 'pending-alerts' },
    allocated: { icon: <FaCheckCircle />, class: 'allocated-resources' },
    critical: { icon: <FaExclamationCircle />, class: 'critical-alerts' }
  };

  const config = iconMap[type] || iconMap.total;

  return (
    <motion.div
      className={`saas-stat-card ${config.class}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="stat-content">
        <div className="stat-icon-wrapper">
          {config.icon}
        </div>
        <div className="stat-data">
          <p className="stat-label">{title}</p>
          <div className="value-group">
            <h1 className="stat-number">{value}</h1>
            <span className="live-pulse"></span>
          </div>
        </div>
      </div>
      <div className="card-accent-glow"></div>
    </motion.div>
  );
}