import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";

export default function AlertChart({ weapon, fire, fight }) {
  const data = [
    { name: "Weapon", value: weapon, color: "#ef4444" }, // Critical Red
    { name: "Fire", value: fire, color: "#f59e0b" },   // Amber Glow
    { name: "Fight", value: fight, color: "#6366f1" }   // Indigo Brand
  ];

  return (
    <div className="chart-card-saas">
      <div className="chart-header">
        <div className="title-group">
          <h3>Incident Distribution</h3>
          <span className="live-indicator">
            <span className="pulse-dot"></span> Real-time Data
          </span>
        </div>
      </div>

      <div className="chart-viewport">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
              }}
              itemStyle={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}