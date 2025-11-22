
type Props = {
  label: string;
  value: number;
};

export default function StatsCard({ label, value }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 16,
        borderRadius: 8,
        minWidth: 100,
        textAlign: "center",
      }}
    >
      <h3>{label}</h3>
      <strong>{value}</strong>
    </div>
  );
}
