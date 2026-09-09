import { useState } from "react";

export default function AdminMenu() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    base: "",
    sauce: "",
    cheese: "",
    vegetables: "",
    available: true,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          vegetables: formData.vegetables
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Pizza add nahi hui");
      }

      setMessage("✅ Pizza successfully add ho gayi!");

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        base: "",
        sauce: "",
        cheese: "",
        vegetables: "",
        available: true,
      });
    } catch (error) {
      console.error("Add Pizza Error:", error);
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>🍕 Admin Menu</h1>
        <p>Add a new pizza to the menu</p>

        {message && <div style={styles.message}>{message}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Pizza Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Pizza Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Veg, Chicken)"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="base"
            placeholder="Pizza Base"
            value={formData.base}
            onChange={handleChange}
          />

          <input
            type="text"
            name="sauce"
            placeholder="Sauce"
            value={formData.sauce}
            onChange={handleChange}
          />

          <input
            type="text"
            name="cheese"
            placeholder="Cheese"
            value={formData.cheese}
            onChange={handleChange}
          />

          <input
            type="text"
            name="vegetables"
            placeholder="Vegetables (comma separated)"
            value={formData.vegetables}
            onChange={handleChange}
          />

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>

          <button type="submit" style={styles.button}>
            ➕ Add Pizza
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "#f5f5f5",
  },

  container: {
    maxWidth: "700px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "25px",
  },

  message: {
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    background: "#f0f0f0",
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};