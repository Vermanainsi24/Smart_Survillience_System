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

export default function AlertChart({ weapon = 0, fire = 0, fight = 0 }) {

  const data = [
    { name: "Weapon", value: weapon, color: "#ef4444" },
    { name: "Fire", value: fire, color: "#f59e0b" },
    { name: "Fight", value: fight, color: "#6366f1" }
  ];

  const totalIncidents = weapon + fire + fight;

  return (
    <div className="chart-card-saas">

      {/* Header */}
      <div className="chart-header">
        <div className="title-group">
          <h3>Incident Distribution</h3>

          <span className="live-indicator">
            <span className="pulse-dot"></span> Real-time Data
          </span>
        </div>

        <div className="incident-total">
          {totalIncidents} incidents
        </div>
      </div>

      {/* Chart */}
      <div className="chart-viewport">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
              formatter={(value) => [`${value} incidents`, "Count"]}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)"
              }}
              itemStyle={{
                color: "#f8fafc",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              barSize={40}
              isAnimationActive={true}
              animationDuration={700}
            >
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