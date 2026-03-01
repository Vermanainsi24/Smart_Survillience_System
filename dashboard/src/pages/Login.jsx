import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShieldAlt, FaLock, FaUser } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin" && password === "admin") {
      navigate("/");
    } else {
      setError("Unauthorized access attempt detected.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="login-viewport">
      <div className="terminal-card">
        {/* Header Section */}
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

        {/* Input Section */}
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

          <button className="initialize-btn" onClick={handleLogin}>
            INITIALIZE SESSION
          </button>
        </div>

        {/* Footer Section */}
        <div className="terminal-footer">
          <span>© 2026 SafeSight Security Systems</span>
        </div>
      </div>
    </div>
  );
}