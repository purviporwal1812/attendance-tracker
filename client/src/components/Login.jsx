import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/mark-attendance");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="/login.jpeg" alt="Logo" />
      </div>
      <div className="name">Login</div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <span className="fas fa-user"></span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <span className="fas fa-lock"></span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <Link to="/users/register">
          <p className="form-link">New User?</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
