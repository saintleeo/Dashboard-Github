import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CommitsChartProps {
  data: number[];
  style?: React.CSSProperties;
}

export default function CommitsChart({ data, style }: CommitsChartProps) {
  const chartData = data.map((count, index) => ({
    week: `Semana ${index + 1}`,
    commits: count,
  }));

  return (
    <div style={{ ...styles.card, ...style }}>
      <h3 style={styles.title}>Commits (Últimas 4 Semanas)</h3>
      
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis 
              dataKey="week" 
              stroke="#8b949e" 
              tick={{ fill: '#8b949e', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#8b949e" 
              tick={{ fill: '#8b949e', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false} 
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', color: '#c9d1d9' }}
              itemStyle={{ color: '#58a6ff' }}
              cursor={{ stroke: '#30363d' }}
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#3fb950" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#3fb950", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "20px",
    boxSizing: "border-box" as const,
    display: "flex",
    flexDirection: "column" as const,
  },
  title: {
    margin: "0 0 20px 0",
    fontSize: "16px",
    color: "#c9d1d9",
    fontWeight: "600",
  },
};