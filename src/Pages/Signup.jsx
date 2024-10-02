import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Save user data to localStorage
    const user = {
      name,
      email,
      password,
    };

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    alert('Signup successful! Please login.');
    
    // Redirect to login page after signup
    navigate('/');
  };

  return (
    <div className="container signup-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="signup-box p-5">
            <h3 className="text-center mb-4">Sign Up</h3>
            <form onSubmit={handleSignup}>
              {/* Name Input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              {/* Confirm Password Input */}
              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {/* Terms and Conditions Checkbox */}
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="terms" required />
                <label className="form-check-label" htmlFor="terms">I agree to the <a href="#">terms and conditions</a></label>
              </div>
              {/* Signup Button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-custom btn-block">Sign Up</button>
              </div>
              {/* Additional Links */}
              <div className="text-center mt-3">
                <span>Already have an account? <Link to='/'>Login here</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
