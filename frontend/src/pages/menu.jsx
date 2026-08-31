
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get pizzas from backend
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pizzas"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch pizzas");
        }

        setPizzas(data.pizzas);
      } catch (error) {
        console.error("Menu Error:", error);
        setError("Pizzas load nahi ho rahi.");
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Add pizza to cart
  const addToCart = (pizza) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item._id === pizza._id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item._id === pizza._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...pizza,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${pizza.name} added to cart!`);
  };

  // Filter pizzas
  const filteredPizzas =
    selectedCategory === "All"
      ? pizzas
      : pizzas.filter(
          (pizza) => pizza.category === selectedCategory
        );

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2>🍕 Pizza Delivery</h2>

        <div style={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">🛒 Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      {/* HEADER */}
      <section style={styles.header}>
        <h1>Our Menu 🍕</h1>
        <p>Choose your favorite pizza</p>
      </section>

      {/* CATEGORIES */}
      <div style={styles.categories}>

        {["All", "Classic", "Meat", "Chicken", "Cheese"].map(
          (category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === category
                  ? styles.activeCategory
                  : {}),
              }}
            >
              {category}
            </button>
          )
        )}

      </div>

      {/* LOADING */}
      {loading && (
        <div style={styles.message}>
          <h2>Loading pizzas... 🍕</h2>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={styles.message}>
          <h2>{error}</h2>
          <p>
            Make sure your backend server is running on port 5000.
          </p>
        </div>
      )}

      {/* PIZZA CARDS */}
      {!loading && !error && (
        <section style={styles.grid}>

          {filteredPizzas.length === 0 ? (
            <div style={styles.message}>
              <h2>No pizzas found 🍕</h2>
            </div>
          ) : (
            filteredPizzas.map((pizza) => (
              <div
                style={styles.card}
                key={pizza._id}
              >

                <img
                  src={pizza.image}
                  alt={pizza.name}
                  style={styles.image}
                />

                <div style={styles.body}>

                  <span style={styles.category}>
                    {pizza.category}
                  </span>

                  <h2>{pizza.name}</h2>

                  <p>
                    {pizza.description}
                  </p>

                  <div style={styles.bottom}>

                    <strong>
                      Rs. {pizza.price}
                    </strong>

                    <button
                      style={styles.button}
                      onClick={() =>
                        addToCart(pizza)
                      }
                    >
                      + Add
                    </button>

                  </div>

                </div>
              </div>
            ))
          )}

        </section>
      )}

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff8f2",
    fontFamily: "Arial, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 7%",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },

  header: {
    textAlign: "center",
    padding: "55px 20px 25px",
  },

  categories: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "40px",
  },

  categoryButton: {
    background: "#fff",
    color: "#333",
    border: "1px solid #e63946",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeCategory: {
    background: "#e63946",
    color: "#fff",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    padding: "0 8% 60px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  body: {
    padding: "20px",
  },

  category: {
    color: "#e63946",
    fontSize: "13px",
    fontWeight: "bold",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },

  button: {
    background: "#e63946",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  message: {
    textAlign: "center",
    padding: "50px",
  },
};

