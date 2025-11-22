import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: Record<string, number>;
};

export default function LanguagesChart({ data }: Props) {
  // Transformar o objeto:
  // { JavaScript: 50000, TypeScript: 20000 }
  // em array para o Recharts:
  const entries = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  // Cores simples (opcional, pode deixar fixo mesmo)
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      <h3>Distribuição de Linguagens</h3>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={entries}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {entries.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
