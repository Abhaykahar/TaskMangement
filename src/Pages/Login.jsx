import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // Check if email and password match the stored data
      if (storedUser.email === email && storedUser.password === password) {
        alert('Login successful!');
        // Navigate to a dashboard or another page
        navigate('/add');
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('No user found. Please sign up.');
    }
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-box p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Login Button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-custom btn-block">Login</button>
              </div>
              {/* Additional Options */}
              <div className="text-center mt-3">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="text-center mt-2">
                <span>Don't have an account? <Link to='/sign'>Sign up</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
