import React from "react";
import "./Styles/AuthStyle.css";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext.jsx";

function Auth() {
  const router = useNavigate();
  const containerRef = useRef(null);
  const [formState, setFormState] = useState(1); // 1 for register and 0 for login
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { handleLogin, handleRegister } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAuthentication();
    console.log("Form submitted successfully : ", {
      username,
      password,
      name,
      email,
    });
  };

  const handleAuthentication = async () => {
    try {
      // login
      if (formState === 0) {
        let result = await handleLogin(username, password);
        setMessage("Authentication successful...");
        setError("");
        // Keep states for UI consistency or clear them if needed
      } else {
        let result = await handleRegister(username, password, name, email);
        setMessage("User registered successfully !!!");
        setError("");
        setTimeout(() => {
          router("/home");
        }, 2000);
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
      setMessage("");
    }
  };

  const toggleForm = () => {
    setFormState(formState === 0 ? 1 : 0);
    setMessage("");
    setError("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container" ref={containerRef}>
        {/* Left Panel - Branding & Visuals */}
        <div className="auth-left-panel">
          <div className="brand-header">
            <span className="logo-icon">VS</span>
            <h2>VidScriptor</h2>
          </div>

          <div className="hero-content">
            <h1>Create Professional Video Scripts in Seconds</h1>
            <p className="hero-subtitle">
              Unleash the power of AI to transform your ideas into engaging
              video content
            </p>

            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="#ffee00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3>AI Magic</h3>
                  <p>Smart script generation</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 6L13.5 15.5L8.5 10.5L1 18"
                      stroke="#ffee00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 6H23V12"
                      stroke="#ffee00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Viral Hook</h3>
                  <p>Catchy intros guaranteed</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="#ffee00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Fast Export</h3>
                  <p>Ready-to-film format</p>
                </div>
              </div>
            </div>
          </div>         
        </div>

        {/* Right Panel - Form */}
        <div className="auth-right-panel">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>{formState ? "Get Started Free" : "Welcome Back"}</h2>
              <p>
                {formState
                  ? "No credit card required. Start creating today."
                  : "Enter your details to access your workspace."}
              </p>
            </div>

            {message && <div className="alert success-alert">{message}</div>}
            {error && <div className="alert error-alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              {formState === 1 && (
                <>
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                {formState ? "Create Account" : "Sign In"}
                <span className="btn-icon">→</span>
              </button>
            </form>

            <div className="form-footer">
              <p>
                {formState ? "Already have an account?" : "New to VidScriptor?"}
                <button type="button" onClick={toggleForm} className="text-btn">
                  {formState ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
