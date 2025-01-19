import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

const valorantCharacters = [
  // Valorant karakter resimleri
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    if (mode === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";

    try {
      const response = await fetch(`${apiUrl}/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (!isLogin) {
          const randomIndex = Math.floor(
            Math.random() * valorantCharacters.length
          );
          data.characterImage = valorantCharacters[randomIndex];
        }

        localStorage.setItem("user", JSON.stringify(data));
        message.success(isLogin ? "Login successful." : "Registration successful.");

        if (isLogin && data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error(isLogin ? "Login failed, please try again." : "Registration failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred, please try again.");
    }
  };

  const toggleMode = () => {
    navigate(`/auth?mode=${isLogin ? "register" : "login"}`);
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <p className="auth-description">
            {isLogin
              ? "Please enter your email and password to Login to your account."
              : "Fill in the form below to create a new Valorant account."}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>
                  Username <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  className="animated-input"
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="animated-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="animated-input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox"  />
                  <span>Remember Me</span>
                </label>
              </div>
            )}

            <button className="btn-submit">{isLogin ? "Login" : "Register"}</button>
          </form>

          {/* Toggle Button */}
          <div className="toggle-auth">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button onClick={toggleMode} className="link-button">
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={toggleMode} className="link-button">
                  Login here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
