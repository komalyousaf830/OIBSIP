import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`
        );

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setMessage(data.message);

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage(data.message || "Email verification failed");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setMessage("Something went wrong. Please try again.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>

      {success && (
        <p>You will be redirected to the login page...</p>
      )}
    </div>
  );
};

export default VerifyEmail;