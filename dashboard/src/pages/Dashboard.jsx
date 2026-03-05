import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatsCard";
import LiveFeed from "../components/Livefeed";
import AlertChart from "../components/AlertChart";

export default function Dashboard() {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ALERTS FROM BACKEND
  // =========================

  useEffect(() => {

    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://localhost:8000/alerts");
        const data = await res.json();

        setAlerts(data.alerts || []);
        setLoading(false);

      } catch (err) {
        console.error("Alert fetch error:", err);
      }
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 2000);

    return () => clearInterval(interval);

  }, []);

  // =========================
  // ALERT CALCULATIONS
  // =========================

  const weaponCount = alerts.filter(a =>
    a.event?.toLowerCase().includes("weapon")
  ).length;

  const fireCount = alerts.filter(a =>
    a.event?.toLowerCase().includes("fire")
  ).length;

  const fightCount = alerts.filter(a =>
    a.event?.toLowerCase().includes("fight")
  ).length;

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <Sidebar alerts={alerts} />

      <div className="main-content">

        <Topbar />

        <main className="dashboard-viewport">

          {/* ======================
              STATS SECTION
          ====================== */}

          <div className="stats-grid">

            <StatCard
              title="Weapon Alerts"
              value={weaponCount}
              type="critical"
            />

            <StatCard
              title="Fire Alerts"
              value={fireCount}
              type="pending"
            />

            <StatCard
              title="Fight Alerts"
              value={fightCount}
              type="total"
            />

            <StatCard
              title="System Health"
              value="100%"
              type="allocated"
            />

          </div>

          {/* ======================
              ANALYTICS SECTION
          ====================== */}

          <div className="analytics-grid">

            <div className="feed-section">
              <LiveFeed />
            </div>

            <div className="chart-section">
              <AlertChart
                weapon={weaponCount}
                fire={fireCount}
                fight={fightCount}
              />
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}