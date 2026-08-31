import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedItems = items
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Remove item
  const removeItem = (id) => {
    const updatedItems = items.filter(
      (item) => item._id !== id
    );

    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = items.length > 0 ? 150 : 0;

  const total = subtotal + delivery;

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <h2>🍕 Pizza Delivery</h2>

        <Link to="/menu" style={styles.back}>
          ← Continue Shopping
        </Link>
      </nav>

      {/* MAIN */}
      <main style={styles.container}>

        <h1>Your Cart 🛒</h1>

        {items.length === 0 ? (
          <div style={styles.emptyCart}>
            <h2>Your cart is empty 🍕</h2>

            <p>
              Add some delicious pizzas from our menu!
            </p>

            <Link to="/menu" style={styles.shopButton}>
              Go to Menu →
            </Link>
          </div>
        ) : (
          <div style={styles.layout}>

            {/* CART ITEMS */}
            <div>
              {items.map((item) => (
                <div
                  style={styles.item}
                  key={item._id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                  />

                  <div style={{ flex: 1 }}>
                    <h2>{item.name}</h2>

                    <p style={styles.category}>
                      {item.category}
                    </p>

                    <p>
                      Rs. {item.price}
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div style={styles.quantityBox}>

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      style={styles.quantityButton}
                    >
                      −
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      style={styles.quantityButton}
                    >
                      +
                    </button>

                  </div>

                  {/* PRICE */}
                  <div style={styles.priceBox}>
                    <strong>
                      Rs. {item.price * item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div style={styles.summary}>

              <h2>Order Summary</h2>

              <div style={styles.row}>
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>

              <div style={styles.row}>
                <span>Delivery</span>
                <span>Rs. {delivery}</span>
              </div>

              <hr />

              <div style={styles.total}>
                <span>Total</span>
                <strong>Rs. {total}</strong>
              </div>

              <Link
                to="/checkout"
                style={styles.checkout}
              >
                Proceed to Checkout →
              </Link>

            </div>

          </div>
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
    padding: "20px 7%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  back: {
    textDecoration: "none",
    color: "#e63946",
    fontWeight: "600",
  },

  container: {
    padding: "50px 8%",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    marginTop: "35px",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  category: {
    color: "#e63946",
    fontSize: "14px",
    fontWeight: "600",
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  quantityButton: {
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "6px",
    background: "#e63946",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },

  priceBox: {
    textAlign: "right",
    minWidth: "100px",
  },

  removeButton: {
    display: "block",
    marginTop: "8px",
    border: "none",
    background: "transparent",
    color: "#e63946",
    cursor: "pointer",
  },

  summary: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    height: "fit-content",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "18px 0",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    marginTop: "20px",
  },

  checkout: {
    display: "block",
    textAlign: "center",
    marginTop: "25px",
    padding: "14px",
    background: "#e63946",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
  },

  emptyCart: {
    textAlign: "center",
    background: "#fff",
    padding: "60px 20px",
    marginTop: "35px",
    borderRadius: "18px",
  },

  shopButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 25px",
    background: "#e63946",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
  },
};