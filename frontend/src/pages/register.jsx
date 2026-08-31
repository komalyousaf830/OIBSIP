import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PIZZA_IMAGE_URL =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Create Account button clicked!");

    // Check password
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Register response:", data);

      if (!response.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Registration successful! Please login.");

      // Go to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        "Server se connection nahi ho raha. Please check backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <style>{css}</style>

      {/* LEFT SIDE */}
      <div className="register-hero">
        <img src={PIZZA_IMAGE_URL} alt="Fresh pizza" />

        <div className="register-hero-content">
          <h1>
            Join the
            <span>Pizza Family</span>
          </h1>

          <div className="register-tagline">
            <span>🍕</span>
            <span>Fresh pizza. Great taste. Happy moments.</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register-panel-wrap">
        <div className="register-card">

          {/* BRAND */}
          <div className="register-brand">
            <span className="pizza-emoji">🍕</span>

            <h2>
              <span className="brand-red">Pizza</span>{" "}
              <span className="brand-dark">Delivery</span>
            </h2>

            <p className="subtitle">
              Create your account
            </p>
          </div>

          {/* FORM */}
          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div className="form-group">
              <label htmlFor="name">
                <span className="field-icon">👤</span>
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                <span className="field-icon">✉️</span>
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">
                <span className="field-icon">📱</span>
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                <span className="field-icon">🔒</span>
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <span className="field-icon">🔐</span>
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="btn-register"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <span>→</span>}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="login-row">
            Already have an account?{" "}
            <a href="/login">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

const css = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  background: #f7ede4;
}

.register-page {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #f7ede4;
}

/* LEFT SIDE */

.register-hero {
  position: relative;
  flex: 1 1 45%;
  min-width: 340px;
  background: #1c1a17;
  overflow: hidden;
  display: flex;
  align-items: center;

  clip-path: polygon(
    0 0,
    100% 0,
    88% 50%,
    100% 100%,
    0 100%
  );
}

.register-hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

.register-hero::after {
  content: '';
  position: absolute;
  inset: 0;

  background: linear-gradient(
    100deg,
    rgba(10,8,6,0.92) 0%,
    rgba(10,8,6,0.55) 45%,
    rgba(10,8,6,0.15) 75%
  );
}

.register-hero-content {
  position: relative;
  z-index: 2;
  padding: 3rem 3rem 3rem 4rem;
  color: #fff;
}

.register-hero-content h1 {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.register-hero-content h1 span {
  display: block;
  color: #ffb703;
}

.register-tagline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.75rem;

  font-size: 1.05rem;
  font-weight: 500;
  color: #f2e9df;
}

/* RIGHT SIDE */

.register-panel-wrap {
  flex: 1 1 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.register-card {
  width: 100%;
  max-width: 480px;

  background: #fffdfb;

  border-radius: 22px;

  box-shadow:
    0 20px 50px rgba(60,30,10,0.08);

  padding: 2.25rem 2.75rem;
}

/* BRAND */

.register-brand {
  text-align: center;
  margin-bottom: 1.25rem;
}

.pizza-emoji {
  font-size: 2.7rem;
  display: inline-block;
}

.register-brand h2 {
  font-size: 1.9rem;
  font-weight: 700;
  margin-top: 0.4rem;
}

.brand-red {
  color: #e63946;
  font-style: italic;
}

.brand-dark {
  color: #22201d;
}

.subtitle {
  margin-top: 0.5rem;
  color: #8a8580;
  font-size: 0.95rem;
}

/* FORM */

.register-form {
  margin-top: 1.5rem;

  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.form-group label {
  display: flex;
  align-items: center;

  gap: 0.4rem;

  font-weight: 600;
  font-size: 0.92rem;

  color: #2a2723;

  margin-bottom: 0.45rem;
}

.field-icon {
  color: #e63946;
}

.form-group input {
  width: 100%;

  padding: 0.82rem 1rem;

  border: 1.5px solid #eadfd2;

  border-radius: 10px;

  font-size: 0.95rem;

  outline: none;

  background: #fffefd;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus {
  border-color: #e63946;

  box-shadow:
    0 0 0 3px rgba(230,57,70,0.12);
}

/* BUTTON */

.btn-register {
  margin-top: 0.4rem;

  width: 100%;

  padding: 0.95rem;

  border: none;

  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #ef4a52,
    #d62839
  );

  color: #fff;

  font-size: 1rem;

  font-weight: 600;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  box-shadow:
    0 12px 24px rgba(214,40,57,0.28);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.btn-register:hover {
  transform: translateY(-1px);

  box-shadow:
    0 14px 28px rgba(214,40,57,0.35);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* LOGIN LINK */

.login-row {
  text-align: center;

  margin-top: 1.4rem;

  font-size: 0.92rem;

  color: #6b665f;
}

.login-row a {
  color: #e63946;

  font-weight: 600;

  text-decoration: none;
}

.login-row a:hover {
  text-decoration: underline;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .register-hero {
    display: none;
  }

  .register-panel-wrap {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }
}
`;