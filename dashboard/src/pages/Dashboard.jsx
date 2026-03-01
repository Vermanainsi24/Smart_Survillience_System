import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatsCard";
import LiveFeed from "../components/Livefeed";
import AlertChart from "../components/AlertChart";

export default function Dashboard() {
  // Alerts state (would be fetched from API)
  const alerts = [
    { event: "Weapon Detected", camera_id: "CAM_01", confidence: 0.92, timestamp: "03:10 AM" },
    { event: "Fire Detected", camera_id: "CAM_02", confidence: 0.88, timestamp: "03:15 AM" }
  ];

  const weaponCount = alerts.filter(a => a.event.includes("Weapon")).length;
  const fireCount = alerts.filter(a => a.event.includes("Fire")).length;
  const fightCount = alerts.filter(a => a.event.includes("Fight")).length;

  return (
    <div className="app-layout">
      <Sidebar alerts={alerts} />
      
      <div className="main-content">
        <Topbar />
        
        <main className="dashboard-viewport">
          {/* Top Row: Operational Overview Stats */}
          <div className="stats-grid">
            <StatCard title="Weapon Alerts" value={weaponCount} type="critical" />
            <StatCard title="Fire Alerts" value={fireCount} type="pending" />
            <StatCard title="Fight Alerts" value={fightCount} type="total" />
            <StatCard title="System Health" value="100%" type="allocated" />
          </div>

          {/* Middle Row: Live Feed & Incident Distribution */}
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