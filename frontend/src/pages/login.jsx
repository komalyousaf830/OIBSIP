import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PIZZA_IMAGE_URL =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
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
        alert(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Server se connection nahi ho raha");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google clicked");
  };

  return (
    <div className="login-page">
      <style>{css}</style>

      {/* LEFT SIDE - HERO */}
      <div className="login-hero">
        <img src={PIZZA_IMAGE_URL} alt="Fresh pizza" />

        <div className="login-hero-content">
          <h1>
            Good Pizza
            <span>Good Mood</span>
          </h1>

          <div className="login-hero-tagline">
            <span className="icon">🛵</span>
            <span>Hot. Fresh. Delivered to your door.</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="login-panel-wrap">
        <div className="login-card">

          <div className="login-brand">
            <span className="pizza-emoji">🍕</span>

            <h2>
              <span className="brand-red">Pizza</span>{" "}
              <span className="brand-dark">Delivery</span>
            </h2>

            <p className="subtitle">
              Login to your account
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                <span className="field-icon">✉️</span>
                Email
              </label>

              <div className="input-wrap">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                <span className="field-icon">🔒</span>
                Password
              </label>

              <div className="input-wrap">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="trailing-icon"
                  onClick={() =>
                    setShowPassword((s) => !s)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-row">
              <a href="/forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="btn-login"
            >
              Login <span>→</span>
            </button>
          </form>

          <div className="divider">
            OR
          </div>

          {/* GOOGLE LOGIN */}
          <button
            className="btn-google"
            onClick={handleGoogleLogin}
          >
            <span>🔴</span>
            Login with Google
          </button>

          {/* REGISTER LINK */}
          <p className="register-row">
            Don&apos;t have an account?{" "}
            <a href="/register">
              Register
            </a>
          </p>

          {/* PERKS */}
          <div className="perks-row">

            <div className="perk">
              <span className="perk-icon">🚚</span>

              <div>
                <h4>Fast Delivery</h4>
                <p>
                  Lightning fast to your door
                </p>
              </div>
            </div>

            <div className="perk">
              <span className="perk-icon">🏅</span>

              <div>
                <h4>Best Quality</h4>
                <p>
                  Fresh &amp; high quality ingredients
                </p>
              </div>
            </div>

            <div className="perk">
              <span className="perk-icon">🛡️</span>

              <div>
                <h4>Secure Payment</h4>
                <p>
                  100% secure &amp; safe payments
                </p>
              </div>
            </div>

            <div className="perk">
              <span className="perk-icon">🎧</span>

              <div>
                <h4>24/7 Support</h4>
                <p>
                  We are always here to help
                </p>
              </div>
            </div>

          </div>
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

.login-page {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #f7ede4;
}

.login-hero {
  position: relative;
  flex: 1 1 45%;
  min-width: 340px;
  background: #1c1a17;
  overflow: hidden;
  align-items: center;
  clip-path: polygon(
    0 0,
    100% 0,
    88% 50%,
    100% 100%,
    0 100%
  );
}

.login-hero img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

.login-hero::after {
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

.login-hero-content {
  position: relative;
  z-index: 2;
  padding: 3rem 3rem 3rem 4rem;
  color: #fff;
}

.login-hero-content h1 {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.login-hero-content h1 span {
  display: block;
  color: #ffb703;
}

.login-hero-tagline {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.75rem;
  font-size: 1.05rem;
  font-weight: 500;
  color: #f2e9df;
}

.login-panel-wrap {
  flex: 1 1 55%;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 480px;
  background: #fffdfb;
  border-radius: 22px;
  box-shadow: 0 20px 50px rgba(60,30,10,0.08);
  padding: 2.75rem 2.75rem 2.25rem;
  margin: 0 auto;
}

.login-brand {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-brand .pizza-emoji {
  font-size: 3rem;
  display: inline-block;
}

.login-brand h2 {
  font-size: 1.9rem;
  font-weight: 700;
  margin-top: 0.5rem;
}

.brand-red {
  color: #e63946;
  font-style: italic;
}

.brand-dark {
  color: #22201d;
}

.login-brand .subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.6rem;
  color: #8a8580;
  font-size: 0.95rem;
}

.login-brand .subtitle::before,
.login-brand .subtitle::after {
  content: '';
  height: 1px;
  width: 28px;
  background: #e63946;
  opacity: 0.5;
}

.login-form {
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.92rem;
  color: #2a2723;
  margin-bottom: 0.5rem;
}

.input-wrap {
  position: relative;
}

.input-wrap input {
  width: 100%;
  padding: 0.85rem 2.75rem 0.85rem 1rem;
  border: 1.5px solid #eadfd2;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  background: #fffefd;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-wrap input:focus {
  border-color: #e63946;
  box-shadow:
    0 0 0 3px rgba(230,57,70,0.12);
}

.input-wrap .trailing-icon {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #b7b0a6;
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  align-items: center;
}

.forgot-row {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.5rem;
}

.forgot-row a {
  color: #e63946;
  font-size: 0.88rem;
  text-decoration: none;
  font-weight: 500;
}

.forgot-row a:hover {
  text-decoration: underline;
}

.btn-login {
  margin-top: 0.25rem;
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

.btn-login:hover {
  transform: translateY(-1px);
  box-shadow:
    0 14px 28px rgba(214,40,57,0.35);
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.5rem 0;
  color: #b7b0a6;
  font-size: 0.8rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee3d6;
}

.btn-google {
  width: 100%;
  padding: 0.85rem;
  border: 1.5px solid #eadfd2;
  border-radius: 12px;
  background: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2a2723;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.btn-google:hover {
  background: #fdf7f0;
  border-color: #e63946;
}

.register-row {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.92rem;
  color: #6b665f;
}

.register-row a {
  color: #e63946;
  font-weight: 600;
  text-decoration: none;
}

.register-row a:hover {
  text-decoration: underline;
}

.perks-row {
  margin-top: 2.25rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.perk {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.perk .perk-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.perk h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #22201d;
}

.perk p {
  font-size: 0.72rem;
  color: #8a8580;
  margin-top: 0.15rem;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .login-hero {
    display: none;
  }

  .perks-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }
}
`;