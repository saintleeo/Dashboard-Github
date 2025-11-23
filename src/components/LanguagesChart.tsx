import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface LanguagesChartProps {
  data: Record<string, number>;
  style?: React.CSSProperties;
}

const COLORS = ["#58a6ff", "#3fb950", "#d2a8ff", "#ffa657", "#ff7b72", "#8b949e"];

export default function LanguagesChart(props: LanguagesChartProps) {
  
  const data = props.data;
  const style = props.style;

  var chartData: { name: string; value: number }[] = []; 
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    chartData.push({
      name: key,
      value: data[key],
    });
  }

  function renderLabel(pieData: any) {
    var name = pieData.name;
    var percent = pieData.percent;
    var finalPercent = (percent !== undefined ? percent : 0) * 100;
    
    return name + " " + finalPercent.toFixed(0) + "%";
  }

  function tooltipFormatter(value: number, name: string, _: any) {
    var total = 0;
    for (var j = 0; j < chartData.length; j++) {
      total = total + chartData[j].value;
    }
    
    var percent = ((value / total) * 100).toFixed(1);
    
    return [value.toLocaleString() + " bytes (" + percent + "%)", name];
  }

  return (
    <div style={{ ...styles.card, ...style }}>
      <h3 style={styles.title}>Linguagens Utilizadas</h3>
      
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              
              label={renderLabel}
              labelLine={{ stroke: '#8b949e' }}
            >
              {chartData.map(function(_, index) {
                return <Cell 
                    key={"cell-" + index}
                    fill={COLORS[index % COLORS.length]} 
                />
              })}
            </Pie>
            <Tooltip 
               contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '6px' }}
               itemStyle={{ color: '#c9d1d9' }}
               formatter={tooltipFormatter}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ color: '#c9d1d9' }}
            />
          </PieChart>
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