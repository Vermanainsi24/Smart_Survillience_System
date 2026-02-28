import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import AlertCard from "../components/AlertCard";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await getAlerts();
      setAlerts(res.data);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const weaponCount = alerts.filter(a => a.event.includes("Weapon")).length;
  const fireCount = alerts.filter(a => a.event.includes("Fire")).length;
  const fightCount = alerts.filter(a => a.event.includes("Fight")).length;

  return (
    <div style={{ background: "#121212", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "white" }}>Smart Surveillance Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <StatsCard title="Weapon Alerts" value={weaponCount} />
        <StatsCard title="Fire Alerts" value={fireCount} />
        <StatsCard title="Fight Alerts" value={fightCount} />
      </div>

      <h2 style={{ color: "white" }}>Recent Alerts</h2>

      {alerts.map((alert, index) => (
        <AlertCard key={index} alert={alert} />
      ))}
    </div>
  );
}