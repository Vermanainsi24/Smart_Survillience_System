export default function AlertCard({ alert }) {
  return (
    <div style={styles.card}>
      <h3 style={{ color: "red" }}>{alert.event}</h3>
      <p><strong>Camera:</strong> {alert.camera_id}</p>
      <p><strong>Confidence:</strong> {(alert.confidence * 100).toFixed(2)}%</p>
      <p><strong>Time:</strong> {alert.timestamp}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#1e1e2f",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
    color: "white",
    borderLeft: "5px solid red"
  }
};