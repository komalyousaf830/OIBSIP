import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Admin login failed");
        return;
      }

      // Save real JWT token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      alert("Admin Login Successful! 👑");

      navigate("/admin");

    } catch (error) {
      console.error("Admin Login Error:", error);
      alert("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1>👑 Admin Login</h1>

        <p style={styles.subtitle}>
          Login to manage Pizza Delivery
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={styles.input}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Logging in..."
              : "Login as Admin 👑"}
          </button>

        </form>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff8f2",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "400px",
    background: "#fff",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
  },

  subtitle: {
    color: "#777",
    marginBottom: "25px",
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

  button: {
    width: "100%",
    padding: "14px",
    background: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};