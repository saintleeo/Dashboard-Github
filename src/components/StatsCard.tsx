
interface StatsCardProps {
  label: string;
  value: number;
}

export default function StatsCard({ label, value }: StatsCardProps) {
  return (
    <div style={styles.card}>
      <span style={styles.value}>{value.toLocaleString()}</span>
      <span style={styles.label}>{label}</span>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "180px",
    flex: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    transition: "transform 0.2s ease-in-out",
  },
  value: {
    fontSize: "32px", 
    fontWeight: "700",
    color: "#f0f6fc",
    marginBottom: "4px",
  },
  label: {
    fontSize: "14px",
    color: "#8b949e",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    fontWeight: "500",
  },
};