import { useEffect, useState } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/inventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load inventory"
        );
      }

      setInventory(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const updateStock = async (id, stock) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/inventory/${id}/stock`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            stock: Number(stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update stock"
        );
      }

      setInventory((previous) =>
        previous.map((item) =>
          item._id === id ? data : item
        )
      );

      setMessage("Stock updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (loading) {
    return <h2 style={styles.loading}>Loading Inventory...</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>📦 Inventory Management</h1>

        <p style={styles.subtitle}>
          Manage your pizza ingredients and current stock.
        </p>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        {inventory.length === 0 ? (
          <div style={styles.empty}>
            <h2>No inventory items found</h2>

            <p>
              Inventory items will appear here once they
              are added to the database.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {inventory.map((item) => (
              <InventoryCard
                key={item._id}
                item={item}
                onUpdate={updateStock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InventoryCard({ item, onUpdate }) {
  const [stock, setStock] = useState(item.stock);

  const isLowStock = item.stock < item.threshold;

  return (
    <div
      style={{
        ...styles.card,
        border: isLowStock
          ? "2px solid #e63946"
          : "1px solid #ddd",
      }}
    >
      <h2>{item.name}</h2>

      <p style={styles.category}>
        Category: {item.category}
      </p>

      <p>
        Current Stock:{" "}
        <strong
          style={{
            color: isLowStock ? "#e63946" : "#222",
          }}
        >
          {item.stock}
        </strong>
      </p>

      <p>
        Low Stock Threshold:{" "}
        <strong>{item.threshold}</strong>
      </p>

      {isLowStock && (
        <p style={styles.warning}>
          ⚠️ Low Stock
        </p>
      )}

      <div style={styles.updateBox}>
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={() =>
            onUpdate(item._id, stock)
          }
          style={styles.button}
        >
          Update Stock
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff8f2",
    padding: "40px 8%",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow:
      "0 5px 15px rgba(0,0,0,0.08)",
  },

  category: {
    color: "#e63946",
    textTransform: "capitalize",
    fontWeight: "600",
  },

  warning: {
    color: "#e63946",
    fontWeight: "bold",
  },

  updateBox: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
  },

  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#e63946",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  message: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  empty: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
  },

  loading: {
    padding: "50px",
    textAlign: "center",
  },
};