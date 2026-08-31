import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load real cart
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setItems(savedCart);
  }, []);

  // Calculate total
  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = items.length > 0 ? 150 : 0;

  const totalAmount = subtotal + delivery;

  const handleOrder = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      navigate("/menu");
      return;
    }

    setLoading(true);

    try {
      // Convert cart items into order items
      const orderItems = items.map((item) => ({
        pizza: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            items: orderItems,
            totalAmount,
            deliveryAddress: address,
            phone,
            paymentMethod: payment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Order failed");
        return;
      }

      // Clear cart after successful order
      localStorage.removeItem("cart");

      alert("Order placed successfully! 🍕");

      navigate("/orders");

    } catch (error) {
      console.error("Order Error:", error);
      alert("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>🍕 Pizza Delivery</h2>

        <Link to="/cart" style={styles.back}>
          ← Back to Cart
        </Link>
      </nav>

      <main style={styles.container}>

        <h1>Checkout 🧾</h1>

        {items.length === 0 ? (
          <div style={styles.empty}>
            <h2>Your cart is empty 🍕</h2>

            <Link to="/menu" style={styles.menuButton}>
              Go to Menu
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleOrder}
            style={styles.form}
          >

            <h2>Delivery Information</h2>

            {/* NAME */}
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              style={styles.input}
            />

            {/* PHONE */}
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="03XX-XXXXXXX"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
              style={styles.input}
            />

            {/* ADDRESS */}
            <label>Delivery Address</label>

            <textarea
              placeholder="Enter complete delivery address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
              style={styles.textarea}
            />

            {/* PAYMENT */}
            <label>Payment Method</label>

            <select
              value={payment}
              onChange={(e) =>
                setPayment(e.target.value)
              }
              style={styles.input}
            >
              <option>Cash on Delivery</option>
              <option>Credit / Debit Card</option>
            </select>

            {/* ORDER SUMMARY */}
            <div style={styles.summary}>

              <h3>Order Summary</h3>

              {items.map((item) => (
                <div
                  key={item._id}
                  style={styles.row}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              ))}

              <div style={styles.row}>
                <span>Delivery</span>
                <span>Rs. {delivery}</span>
              </div>

              <hr />

              <div style={styles.total}>
                <span>Total Amount</span>

                <strong>
                  Rs. {totalAmount}
                </strong>
              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Placing Order..."
                : "Place Order 🍕"}
            </button>

          </form>
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

  nav: {
    padding: "20px 8%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  back: {
    textDecoration: "none",
    color: "#e63946",
    fontWeight: "600",
  },

  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "0 20px",
  },

  form: {
    background: "#fff",
    padding: "35px",
    borderRadius: "18px",
    marginTop: "25px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "13px",
    marginTop: "8px",
    marginBottom: "18px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "13px",
    marginTop: "8px",
    marginBottom: "18px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  summary: {
    marginTop: "25px",
    padding: "20px",
    background: "#fff8f2",
    borderRadius: "12px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "12px 0",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "20px 0",
  },

  button: {
    width: "100%",
    padding: "15px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  empty: {
    background: "#fff",
    padding: "50px",
    textAlign: "center",
    marginTop: "25px",
    borderRadius: "18px",
  },

  menuButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 25px",
    background: "#e63946",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
  },
};