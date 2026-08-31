import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>🍕 Pizza Delivery Admin</h2>

        <button
          onClick={handleLogout}
          style={styles.logout}
        >
          Logout
        </button>
      </nav>

      {/* MAIN */}
      <main style={styles.container}>

        <h1>Admin Dashboard 👑</h1>

        <p style={styles.subtitle}>
          Manage your pizza delivery application
        </p>

        {/* CARDS */}
        <div style={styles.cards}>

          <div style={styles.card}>
            <h2>📦</h2>
            <h3>Orders</h3>
            <p>View and manage customer orders</p>

            <Link
              to="/admin/orders"
              style={styles.button}
            >
              Manage Orders
            </Link>
          </div>

          <div style={styles.card}>
            <h2>🍕</h2>
            <h3>Menu</h3>
            <p>Manage pizzas and menu items</p>

            <Link
              to="/admin/menu"
              style={styles.button}
            >
              Manage Menu
            </Link>
          </div>

          <div style={styles.card}>
            <h2>📊</h2>
            <h3>Inventory</h3>
            <p>Manage pizza ingredients and stock</p>

            <Link
              to="/admin/inventory"
              style={styles.button}
            >
              Manage Inventory
            </Link>
          </div>

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
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  logout: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  container: {
    padding: "50px 8%",
  },

  subtitle: {
    color: "#777",
    marginBottom: "35px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  button: {
    display: "inline-block",
    marginTop: "15px",
    padding: "11px 18px",
    background: "#e63946",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
  },
};