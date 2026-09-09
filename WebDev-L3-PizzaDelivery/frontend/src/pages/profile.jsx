import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <h2>🍕 Pizza Delivery</h2>

        <div>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/orders">Orders</Link>
        </div>
      </nav>

      <main style={styles.container}>
        <div style={styles.card}>
          <div style={styles.avatar}>👤</div>

          <h1>My Profile</h1>

          <div style={styles.info}>
            <div>
              <strong>Name</strong>
              <p>Pizza Customer</p>
            </div>

            <div>
              <strong>Email</strong>
              <p>customer@example.com</p>
            </div>

            <div>
              <strong>Phone</strong>
              <p>0300-1234567</p>
            </div>

            <div>
              <strong>Address</strong>
              <p>Your delivery address</p>
            </div>
          </div>

          <button style={styles.button}>
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff8f2",
    fontFamily: "Arial, sans-serif",
  },

  nav: {
    padding: "20px 8%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
  },

  container: {
    maxWidth: "600px",
    margin: "60px auto",
    padding: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  avatar: {
    fontSize: "70px",
    marginBottom: "15px",
  },

  info: {
    textAlign: "left",
    marginTop: "30px",
  },

  button: {
    marginTop: "25px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};