import React, { useEffect, useState } from "react";
import { 
  FaChartLine, FaShieldAlt, FaSatellite, FaHistory, FaVideo 
} from "react-icons/fa";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#ef4444", "#22c55e"];

export default function Analytics() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/alerts/history")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // --- Data Processing (Prevents ReferenceErrors) ---
  const fire = alerts.filter((a) => a.event?.toUpperCase().includes("FIRE")).length;
  const weapon = alerts.filter((a) => a.event?.toUpperCase().includes("WEAPON")).length;
  const violence = alerts.filter((a) => a.event?.toUpperCase().includes("VIOLENCE")).length;

  const incidentData = [
    { name: "Fire", value: fire },
    { name: "Weapon", value: weapon },
    { name: "Violence", value: violence }
  ];

  const severityCount = {};
  alerts.forEach((a) => {
    const s = a.severity || "Unknown";
    severityCount[s] = (severityCount[s] || 0) + 1;
  });
  const severityData = Object.keys(severityCount).map((key) => ({ name: key, value: severityCount[key] }));

  const timeMap = {};
  alerts.forEach((a) => {
    const hour = a.timestamp?.split(" ")[1]?.split(":")[0] || "00";
    timeMap[hour] = (timeMap[hour] || 0) + 1;
  });
  const timelineData = Object.keys(timeMap).sort().map((key) => ({ hour: `${key}:00`, alerts: timeMap[key] }));

  const cameraMap = {};
  alerts.forEach((a) => {
    cameraMap[a.camera_id] = (cameraMap[a.camera_id] || 0) + 1;
  });
  const cameraData = Object.keys(cameraMap).map((key) => ({ camera: key, alerts: cameraMap[key] }));

  if (loading) {
    return (
      <div className="analytics-viewport loading-center">
        <span className="pulse-dot-green"></span>
        <p className="loading-text">SYNCHRONIZING THREAT INTELLIGENCE...</p>
      </div>
    );
  }

  return (
    <div className="analytics-viewport">
      <div className="analytics-container">
        <header className="analytics-header">
          <div className="title-area">
            <FaChartLine className="header-icon-glow" />
            <h2>SYSTEM ANALYTICS & THREAT INTEL</h2>
          </div>
          <div className="live-status-badge">
            <span className="pulse-dot-green"></span>
            SECURE UPLINK ACTIVE
          </div>
        </header>

        <div className="charts-grid">
          {/* Incident Distribution */}
          <div className="chart-card glass-morphism">
            <h3><FaShieldAlt /> Incident Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={incidentData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Severity Breakdown */}
          <div className="chart-card glass-morphism">
            <h3><FaSatellite /> Severity Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={severityData} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                  {severityData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts Over Time */}
          <div className="chart-card glass-morphism">
            <h3><FaHistory /> Alerts Activity (24h)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Camera-wise */}
          <div className="chart-card glass-morphism">
            <h3><FaVideo /> Node-Specific Detections</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cameraData}>
                <XAxis dataKey="camera" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="alerts" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}