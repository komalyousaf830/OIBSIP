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

  // Load cart
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setItems(savedCart);
  }, []);

  // Load Razorpay Checkout script
  useEffect(() => {
    const scriptId = "razorpay-checkout-script";

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");

    script.id = scriptId;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const existingScript =
        document.getElementById(scriptId);

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Delivery charges
  const delivery = items.length > 0 ? 150 : 0;

  // Final amount
  const totalAmount = subtotal + delivery;

  // Convert cart items into order items
  const getOrderItems = () => {
    return items.map((item) => ({
      pizza: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
  };

  // Save order in database
  const saveOrder = async (token) => {
    const orderItems = getOrderItems();

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
      throw new Error(
        data.message || "Order creation failed"
      );
    }

    return data;
  };

  // ================================
  // CASH ON DELIVERY
  // ================================
  const handleCashOnDelivery = async (token) => {
    const data = await saveOrder(token);

    localStorage.removeItem("cart");

    alert(
      data.message ||
        "Order placed successfully! 🍕"
    );

    navigate("/orders");
  };

  // ================================
  // RAZORPAY PAYMENT
  // ================================
  const handleRazorpayPayment = async (token) => {
    const razorpayKey =
      import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Check frontend Razorpay key
    if (
      !razorpayKey ||
      razorpayKey === "YOUR_RAZORPAY_KEY_ID"
    ) {
      alert(
        "Razorpay Key ID missing. Please add VITE_RAZORPAY_KEY_ID in frontend .env"
      );
      return;
    }

    // Check Razorpay script
    if (!window.Razorpay) {
      alert(
        "Razorpay Checkout load nahi hua. Please refresh the page."
      );
      return;
    }

    // --------------------------------
    // STEP 1: Create Razorpay Order
    // --------------------------------
    const createResponse = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          amount: totalAmount,
        }),
      }
    );

    const createData = await createResponse.json();

    if (!createResponse.ok || !createData.success) {
      throw new Error(
        createData.message ||
          "Razorpay order creation failed"
      );
    }

    const razorpayOrder = createData.order;

    // --------------------------------
    // STEP 2: Open Razorpay Checkout
    // --------------------------------
    const options = {
      key: razorpayKey,

      amount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      name: "Pizza Delivery",

      description: "Pizza Order Payment",

      order_id: razorpayOrder.id,

      handler: async function (response) {
        try {
          setLoading(true);

          // --------------------------------
          // STEP 3: Verify Payment
          // --------------------------------
          const verifyResponse = await fetch(
            "http://localhost:5000/api/payment/verify",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }),
            }
          );

          const verifyData =
            await verifyResponse.json();

          if (
            !verifyResponse.ok ||
            !verifyData.success
          ) {
            alert(
              verifyData.message ||
                "Payment verification failed"
            );

            return;
          }

          // --------------------------------
          // STEP 4: Save Pizza Order
          // --------------------------------
          const orderData =
            await saveOrder(token);

          localStorage.removeItem("cart");

          alert(
            orderData.message ||
              "Payment successful! Order placed! 🍕"
          );

          navigate("/orders");
        } catch (error) {
          console.error(
            "Payment Success Error:",
            error
          );

          alert(
            error.message ||
              "Payment successful but order save nahi ho saka."
          );
        } finally {
          setLoading(false);
        }
      },

      prefill: {
        name: name,
        contact: phone,
      },

      notes: {
        address: address,
      },

      theme: {
        color: "#e63946",
      },

      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.on(
      "payment.failed",
      function (response) {
        console.error(
          "Razorpay Payment Failed:",
          response.error
        );

        alert(
          response.error?.description ||
            "Payment failed. Please try again."
        );

        setLoading(false);
      }
    );

    razorpay.open();
  };

  // ================================
  // MAIN ORDER FUNCTION
  // ================================
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

    if (!name || !phone || !address) {
      alert("Please fill all delivery information.");
      return;
    }

    setLoading(true);

    try {
      // COD
      if (payment === "Cash on Delivery") {
        await handleCashOnDelivery(token);
      }

      // Razorpay
      else {
        await handleRazorpayPayment(token);
      }
    } catch (error) {
      console.error("Checkout Error:", error);

      alert(
        error.message ||
          "Checkout mein error aa gaya."
      );
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

            <Link
              to="/menu"
              style={styles.menuButton}
            >
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
              <option>
                Cash on Delivery
              </option>

              <option>
                Credit / Debit Card
              </option>
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
                    {item.name} ×{" "}
                    {item.quantity}
                  </span>

                  <span>
                    Rs.{" "}
                    {item.price *
                      item.quantity}
                  </span>
                </div>
              ))}

              <div style={styles.row}>
                <span>Delivery</span>

                <span>
                  Rs. {delivery}
                </span>
              </div>

              <hr />

              <div style={styles.total}>
                <span>
                  Total Amount
                </span>

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
                ? "Processing..."
                : payment ===
                  "Credit / Debit Card"
                ? "Pay with Razorpay 💳"
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
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",
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