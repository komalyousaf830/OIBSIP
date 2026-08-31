import { Link } from "react-router-dom";

export default function Home() {
  const pizzas = [
    {
      id: 1,
      name: "Margherita",
      description: "Fresh tomatoes, mozzarella and basil",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Loaded with delicious pepperoni",
      price: 1099,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Cheese Pizza",
      description: "Extra cheesy and absolutely delicious",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>🍕 Pizza Delivery</h2>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/menu" style={styles.link}>Menu</Link>
          <Link to="/orders" style={styles.link}>Orders</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
          <Link to="/cart" style={styles.cart}>🛒 Cart</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <p style={styles.smallTitle}>FRESH • HOT • DELICIOUS</p>

          <h1 style={styles.heroTitle}>
            Your Favorite Pizza,
            <br />
            Delivered Fast 🍕
          </h1>

          <p style={styles.heroText}>
            Order delicious pizzas made with fresh ingredients
            and delivered straight to your door.
          </p>

          <Link to="/menu" style={styles.button}>
            Order Now →
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop"
          alt="Pizza"
          style={styles.heroImage}
        />
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <div style={styles.feature}>
          🚚
          <h3>Fast Delivery</h3>
          <p>Hot pizza at your doorstep</p>
        </div>

        <div style={styles.feature}>
          🥇
          <h3>Best Quality</h3>
          <p>Fresh ingredients every day</p>
        </div>

        <div style={styles.feature}>
          💳
          <h3>Secure Payment</h3>
          <p>Safe and easy payments</p>
        </div>

        <div style={styles.feature}>
          ❤️
          <h3>Made With Love</h3>
          <p>Pizza you'll love</p>
        </div>
      </section>

      {/* POPULAR PIZZAS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Popular Pizzas 🍕</h2>

        <div style={styles.cards}>
          {pizzas.map((pizza) => (
            <div key={pizza.id} style={styles.card}>
              <img
                src={pizza.image}
                alt={pizza.name}
                style={styles.cardImage}
              />

              <div style={styles.cardBody}>
                <h3>{pizza.name}</h3>

                <p>{pizza.description}</p>

                <div style={styles.cardBottom}>
                  <strong>Rs. {pizza.price}</strong>

                  <Link
                    to="/menu"
                    style={styles.addButton}
                  >
                    Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff8f2",
    fontFamily: "Poppins, Arial, sans-serif",
    color: "#2a2723",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 6%",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },

  logo: {
    color: "#e63946",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },

  cart: {
    textDecoration: "none",
    color: "#fff",
    background: "#e63946",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "600",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
    padding: "70px 8%",
    background: "#f7ede4",
  },

  smallTitle: {
    color: "#e63946",
    fontWeight: "700",
    letterSpacing: "2px",
  },

  heroTitle: {
    fontSize: "48px",
    lineHeight: "1.1",
    margin: "15px 0",
  },

  heroText: {
    color: "#6b665f",
    maxWidth: "520px",
    fontSize: "17px",
    lineHeight: "1.7",
    marginBottom: "25px",
  },

  button: {
    display: "inline-block",
    textDecoration: "none",
    background: "#e63946",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "600",
  },

  heroImage: {
    width: "430px",
    height: "330px",
    objectFit: "cover",
    borderRadius: "30px",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "45px 8%",
    background: "#fff",
  },

  feature: {
    textAlign: "center",
    padding: "20px",
    fontSize: "30px",
  },

  section: {
    padding: "60px 8%",
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "35px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  cardImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  cardBody: {
    padding: "20px",
  },

  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "18px",
  },

  addButton: {
    textDecoration: "none",
    background: "#e63946",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "8px",
  },
};