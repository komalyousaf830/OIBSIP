
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const statuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to load orders");
          return;
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Admin Orders Error:", error);
        alert("Server se connection nahi ho raha");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Admin login required!");
      navigate("/admin-login");
      return;
    }

    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? data.order : order
        )
      );

      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Server se connection nahi ho raha");
    } finally {
      setUpdatingId(null);
    }
  };

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
            <div key={order._id} style={styles.order}>
              <div>
                <h2>
                  Order #{order._id.slice(-6)}
                </h2>

                <p style={styles.date}>
                  {new Date(order.createdAt).toLocaleString()}
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
                  {order.phone || order.user?.phone || "N/A"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.deliveryAddress}
                </p>

                <div style={styles.items}>
                  <strong>Items:</strong>

                  {order.items?.map((item, index) => (
                    <p key={index}>
                      🍕 {item.name || item.pizza?.name || "Pizza"} ×{" "}
                      {item.quantity}
                    </p>
                  ))}
                </div>
              </div>

              <div style={styles.right}>
                <strong style={styles.total}>
                  Rs. {order.totalAmount}
                </strong>

                <label style={styles.statusLabel}>
                  Order Status
                </label>

                <select
                  value={order.status || "Pending"}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  disabled={updatingId === order._id}
                  style={styles.statusSelect}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {updatingId === order._id && (
                  <small style={styles.updating}>
                    Updating...
                  </small>
                )}
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
    gap: "30px",
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
    gap: "10px",
    minWidth: "180px",
  },

  total: {
    fontSize: "20px",
  },

  statusLabel: {
    fontWeight: "600",
    color: "#555",
  },

  statusSelect: {
    padding: "9px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    minWidth: "170px",
  },

  updating: {
    color: "#777",
  },

  empty: {
    background: "#fff",
    padding: "50px",
    marginTop: "30px",
    textAlign: "center",
    borderRadius: "15px",
  },
};

