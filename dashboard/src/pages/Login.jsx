import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShieldAlt, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://tamie-aglint-slightly.ngrok-free.dev/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.access_token) {
        navigate("/");
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        
      } else {
        setError("Unauthorized access attempt detected.");
      }
    } catch (err) {
      setError("Connection to security server failed.");
    }

    setLoading(false);
  };

  return (
    <div className="login-viewport">
      <div className="terminal-card">
        <div className="terminal-header">
          <div className="shield-icon">
            <FaShieldAlt />
          </div>
          <h1 className="brand-title">SAFE SIGHT</h1>
          <div className="terminal-status">
            <span className="pulse-dot"></span>
            <span>SECURE ACCESS TERMINAL</span>
          </div>
        </div>

        <div className="terminal-body">
          {error && <div className="error-alert">{error}</div>}

          <div className="input-field">
            <FaUser className="field-icon" />
            <input
              type="text"
              placeholder="Username or Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaLock className="field-icon" />
            <input
              type="password"
              placeholder="Security Key"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="initialize-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "AUTHENTICATING..." : "INITIALIZE SESSION"}
          </button>
        </div>

        <div className="terminal-footer">
          <span>© 2026 SafeSight Security Systems</span>
        </div>
      </div>
    </div>
  );
}