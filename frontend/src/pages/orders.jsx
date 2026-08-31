import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
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

        setOrders(data.orders);
      } catch (error) {
        console.error("Orders Error:", error);
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
        <h2>Loading your orders... 🍕</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>🍕 Pizza Delivery</h2>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>

          <Link to="/menu" style={styles.link}>
            Menu
          </Link>

          <Link to="/cart" style={styles.link}>
            🛒 Cart
          </Link>
        </div>
      </nav>

      {/* MAIN */}
      <main style={styles.container}>
        <h1>My Orders 📦</h1>

        {orders.length === 0 ? (
          <div style={styles.empty}>
            <h2>No orders yet 🍕</h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <Link to="/menu" style={styles.menuButton}>
              Browse Menu
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div style={styles.order} key={order._id}>
              {/* LEFT */}
              <div>
                <h2>
                  Order #{order._id.slice(-6)}
                </h2>

                <p style={styles.date}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <div style={styles.items}>
                  {order.items.map((item, index) => (
                    <p key={index}>
                      🍕 {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                <p>
                  📍 {order.deliveryAddress}
                </p>

                <p>
                  📱 {order.phone}
                </p>
              </div>

              {/* RIGHT */}
              <div style={styles.right}>
                <strong style={styles.total}>
                  Rs. {order.totalAmount}
                </strong>

                <span
                  style={{
                    ...styles.status,
                    background:
                      order.status === "Delivered"
                        ? "#d8f3dc"
                        : "#fff3cd",
                    color:
                      order.status === "Delivered"
                        ? "#2d6a4f"
                        : "#856404",
                  }}
                >
                  {order.status}
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
    background: "#fff8f2",
    fontFamily: "Arial, sans-serif",
  },

  nav: {
    padding: "20px 8%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    alignItems: "center",
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    marginTop: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
  },

  date: {
    color: "#777",
    marginTop: "5px",
  },

  items: {
    margin: "15px 0",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
  },

  total: {
    fontSize: "20px",
  },

  status: {
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },

  empty: {
    background: "#fff",
    padding: "50px",
    marginTop: "30px",
    borderRadius: "15px",
    textAlign: "center",
  },

  menuButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
    background: "#e63946",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
  },
};