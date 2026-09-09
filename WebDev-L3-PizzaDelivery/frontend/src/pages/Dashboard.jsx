import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7ede4",
        padding: "40px",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fffdfb",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 50px rgba(60,30,10,0.08)",
        }}
      >
        <h1 style={{ color: "#e63946" }}>
          🍕 Pizza Delivery
        </h1>

        <h2 style={{ marginTop: "30px", color: "#22201d" }}>
          Welcome, {user?.name || "User"}! 👋
        </h2>

        <p style={{ marginTop: "10px", color: "#6b665f" }}>
          You are successfully logged in.
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fdf7f0",
            borderRadius: "12px",
          }}
        >
          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Email:</strong> {user?.email}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>

        <button
          onClick={() => navigate("/menu")}
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#e63946",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          View Menu 🍕
        </button>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            marginLeft: "15px",
            padding: "12px 25px",
            border: "1px solid #e63946",
            borderRadius: "10px",
            background: "#fff",
            color: "#e63946",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}