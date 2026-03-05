import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaShieldAlt, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const response = await axios.post(
        "http://localhost:8000/login",
        {
          email: email,
          password: password
        }
      );

      const data = response.data;

      if (data?.access_token) {

        // Use context login
        login(data.access_token, data.role);

        // Redirect
        navigate("/");

      } else {
        setError("Unauthorized access attempt detected.");
      }

    } catch (err) {

      if (err.response?.status === 401) {
        setError("Invalid credentials.");
      } else {
        setError("Connection to security server failed.");
      }

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

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <div className="input-field">
            <FaUser className="field-icon" />
            <input
              type="text"
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <FaLock className="field-icon" />
            <input
              type="password"
              placeholder="Security Key"
              value={password}
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