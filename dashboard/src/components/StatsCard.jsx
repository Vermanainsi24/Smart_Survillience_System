export default function StatsCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "#2a2a40",
    padding: "20px",
    borderRadius: "8px",
    color: "white",
    width: "200px"
  }
};