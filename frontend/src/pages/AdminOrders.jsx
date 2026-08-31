import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin login required!");
        navigate("/admin-login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to load orders");
          return;
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Admin Orders Error:", error);
        alert("Server se connection nahi ho raha");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <h2>Loading all orders... 📦</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>🍕 Admin Panel</h2>

        <div style={styles.links}>
          <Link to="/admin" style={styles.link}>
            Dashboard
          </Link>

          <Link to="/admin/orders" style={styles.link}>
            Orders
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <main style={styles.container}>

        <h1>All Orders 📦</h1>

        {orders.length === 0 ? (
          <div style={styles.empty}>
            <h2>No orders found</h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={styles.order}
            >
              <div>
                <h2>
                  Order #{order._id.slice(-6)}
                </h2>

                <p style={styles.date}>
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {order.user?.name || "Unknown"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.user?.email || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.deliveryAddress}
                </p>

                <div style={styles.items}>
                  <strong>Items:</strong>

                  {order.items.map((item, index) => (
                    <p key={index}>
                      🍕 {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>

              <div style={styles.right}>
                <strong style={styles.total}>
                  Rs. {order.totalAmount}
                </strong>

                <span style={styles.status}>
                  {order.status || "Pending"}
                </span>
              </div>
            </div>
          ))
        )}

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

  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  nav: {
    padding: "20px 8%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  links: {
    display: "flex",
    gap: "25px",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "600",
  },

  container: {
    padding: "50px 8%",
  },

  order: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    padding: "25px",
    marginTop: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
  },

  date: {
    color: "#777",
  },

  items: {
    marginTop: "15px",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "12px",
  },

  total: {
    fontSize: "20px",
  },

  status: {
    background: "#fff3cd",
    color: "#856404",
    padding: "7px 12px",
    borderRadius: "20px",
    fontWeight: "600",
  },

  empty: {
    background: "#fff",
    padding: "50px",
    marginTop: "30px",
    textAlign: "center",
    borderRadius: "15px",
  },
};