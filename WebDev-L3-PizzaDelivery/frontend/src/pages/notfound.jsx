import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.page}>
      <div>
        <div style={styles.emoji}>🍕</div>

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist.
        </p>

        <Link to="/" style={styles.button}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "#fff8f2",
    fontFamily: "Arial, sans-serif",
  },

  emoji: {
    fontSize: "80px",
  },

  h1: {
    fontSize: "80px",
    color: "#e63946",
  },

  button: {
    display: "inline-block",
    marginTop: "25px",
    padding: "12px 25px",
    background: "#e63946",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
  },
};