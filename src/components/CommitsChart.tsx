import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: number[];
};

export default function CommitsChart({ data }: Props) {
  // Transformando o array [10, 20, 5, 40] em um formato que o Recharts entende
  const chartData = data.map((value, index) => ({
    week: `W${index + 1}`,
    commits: value,
  }));

  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      <h3>Commits (últimas 4 semanas)</h3>

      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="commits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
