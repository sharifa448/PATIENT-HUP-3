import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ به داشبورد برو
    navigate('/dashboard');
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ===== بخش چپ ===== */}
        <div className="left-side">
          <div className="logo">
            <span className="logo-bar"></span>
            <span className="logo-bar logo-bar-small"></span>
          </div>

          <h1 className="welcome-title">Welcome!</h1>

          <div className="divider-line"></div>

          <p className="welcome-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <button className="btn-learn-more">Learn More</button>
        </div>

        {/* ===== بخش راست ===== */}
        <div className="right-side">
          <h2 className="signin-title">Sign in</h2>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="input-group">
              <label className="input-label">User Name</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* ✅ دکمه Submit - با type="submit" */}
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
<div className="social-icons">
  <a href="#" aria-label="Facebook">
    <FaFacebookF />
  </a>
  <a href="#" aria-label="Instagram">
    <FaInstagram />
  </a>
  <a href="#" aria-label="Pinterest">
    <FaPinterestP />
  </a>
</div>
        </div>

      </div>
    </div>
  );
};

export default Login;
