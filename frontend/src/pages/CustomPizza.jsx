import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const bases = [
  { name: "Classic Thin Crust", price: 300 },
  { name: "Classic Thick Crust", price: 350 },
  { name: "Cheese Burst", price: 450 },
  { name: "Whole Wheat", price: 400 },
  { name: "Gluten Free", price: 500 },
];

const sauces = [
  { name: "Classic Tomato", price: 100 },
  { name: "Spicy Marinara", price: 120 },
  { name: "BBQ Sauce", price: 130 },
  { name: "Garlic Sauce", price: 120 },
  { name: "Pesto Sauce", price: 150 },
];

const cheeses = [
  { name: "Mozzarella", price: 150 },
  { name: "Cheddar", price: 170 },
  { name: "Parmesan", price: 200 },
  { name: "Cheese Blend", price: 180 },
  { name: "Vegan Cheese", price: 220 },
];

const vegetables = [
  { name: "Onion", price: 30 },
  { name: "Tomato", price: 30 },
  { name: "Capsicum", price: 40 },
  { name: "Mushroom", price: 50 },
  { name: "Olives", price: 60 },
  { name: "Jalapeno", price: 40 },
  { name: "Corn", price: 40 },
  { name: "Spinach", price: 40 },
];

const CustomPizza = () => {
  const navigate = useNavigate();

  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  const handleVegetableChange = (vegetable) => {
    setSelectedVegetables((prev) => {
      const alreadySelected = prev.some(
        (item) => item.name === vegetable.name
      );

      if (alreadySelected) {
        return prev.filter(
          (item) => item.name !== vegetable.name
        );
      }

      return [...prev, vegetable];
    });
  };

  const vegetablesPrice = selectedVegetables.reduce(
    (total, vegetable) => total + vegetable.price,
    0
  );

  const totalPrice =
    (selectedBase?.price || 0) +
    (selectedSauce?.price || 0) +
    (selectedCheese?.price || 0) +
    vegetablesPrice;

  const addToCart = () => {
    if (!selectedBase || !selectedSauce || !selectedCheese) {
      alert("Please select Base, Sauce and Cheese first.");
      return;
    }

    const customPizza = {
      _id: `custom-${Date.now()}`,
      name: "Custom Pizza",
      category: "Custom Pizza",
      price: totalPrice,
      quantity: 1,
      image: "/pizza-placeholder.jpg",

      customPizza: true,

      base: selectedBase.name,
      sauce: selectedSauce.name,
      cheese: selectedCheese.name,

      vegetables: selectedVegetables.map(
        (vegetable) => vegetable.name
      ),
    };

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...existingCart, customPizza];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Custom Pizza added to cart! 🍕");

    navigate("/cart");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff8f2",
        padding: "40px 8%",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🍕 Build Your Custom Pizza</h1>

      {/* STEP 1 */}
      <h2>Step 1: Choose Your Pizza Base</h2>

      <div style={styles.options}>
        {bases.map((base) => (
          <button
            key={base.name}
            type="button"
            onClick={() => setSelectedBase(base)}
            style={{
              ...styles.optionButton,
              ...(selectedBase?.name === base.name
                ? styles.selectedButton
                : {}),
            }}
          >
            {base.name}
            <br />
            <small>Rs. {base.price}</small>
          </button>
        ))}
      </div>

      {selectedBase && (
        <p>
          Selected Base:{" "}
          <strong>{selectedBase.name}</strong>
        </p>
      )}

      {/* STEP 2 */}
      <h2>Step 2: Choose Your Sauce</h2>

      <div style={styles.options}>
        {sauces.map((sauce) => (
          <button
            key={sauce.name}
            type="button"
            onClick={() => setSelectedSauce(sauce)}
            style={{
              ...styles.optionButton,
              ...(selectedSauce?.name === sauce.name
                ? styles.selectedButton
                : {}),
            }}
          >
            {sauce.name}
            <br />
            <small>Rs. {sauce.price}</small>
          </button>
        ))}
      </div>

      {selectedSauce && (
        <p>
          Selected Sauce:{" "}
          <strong>{selectedSauce.name}</strong>
        </p>
      )}

      {/* STEP 3 */}
      <h2>Step 3: Choose Your Cheese</h2>

      <div style={styles.options}>
        {cheeses.map((cheese) => (
          <button
            key={cheese.name}
            type="button"
            onClick={() => setSelectedCheese(cheese)}
            style={{
              ...styles.optionButton,
              ...(selectedCheese?.name === cheese.name
                ? styles.selectedButton
                : {}),
            }}
          >
            {cheese.name}
            <br />
            <small>Rs. {cheese.price}</small>
          </button>
        ))}
      </div>

      {selectedCheese && (
        <p>
          Selected Cheese:{" "}
          <strong>{selectedCheese.name}</strong>
        </p>
      )}

      {/* STEP 4 */}
      <h2>Step 4: Choose Your Vegetables</h2>

      <div style={styles.vegetables}>
        {vegetables.map((vegetable) => (
          <label
            key={vegetable.name}
            style={styles.checkboxLabel}
          >
            <input
              type="checkbox"
              checked={selectedVegetables.some(
                (item) => item.name === vegetable.name
              )}
              onChange={() =>
                handleVegetableChange(vegetable)
              }
            />

            {" "}

            {vegetable.name} (+Rs. {vegetable.price})
          </label>
        ))}
      </div>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <h2>🍕 Pizza Summary</h2>

        <p>
          <strong>Base:</strong>{" "}
          {selectedBase
            ? `${selectedBase.name} - Rs. ${selectedBase.price}`
            : "Not selected"}
        </p>

        <p>
          <strong>Sauce:</strong>{" "}
          {selectedSauce
            ? `${selectedSauce.name} - Rs. ${selectedSauce.price}`
            : "Not selected"}
        </p>

        <p>
          <strong>Cheese:</strong>{" "}
          {selectedCheese
            ? `${selectedCheese.name} - Rs. ${selectedCheese.price}`
            : "Not selected"}
        </p>

        <p>
          <strong>Vegetables:</strong>{" "}
          {selectedVegetables.length > 0
            ? selectedVegetables
                .map((vegetable) => vegetable.name)
                .join(", ")
            : "None selected"}
        </p>

        <hr />

        <h2>Total: Rs. {totalPrice}</h2>

        <button
          type="button"
          onClick={addToCart}
          style={styles.addButton}
        >
          🛒 Add Custom Pizza to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  options: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "15px",
  },

  optionButton: {
    padding: "15px 20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  selectedButton: {
    background: "#e63946",
    color: "#fff",
    border: "2px solid #c1121f",
  },

  vegetables: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
  },

  checkboxLabel: {
    display: "block",
    marginBottom: "10px",
    cursor: "pointer",
  },

  summary: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    maxWidth: "600px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  addButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#e63946",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CustomPizza;