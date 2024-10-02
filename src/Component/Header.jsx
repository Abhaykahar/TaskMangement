import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.role) {
      setUserRole(storedUser.role); // Set the user role from localStorage
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: "white" }}>Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Conditionally show user role */}
              {userRole && (
                <li className="nav-item">
                  <span className="nav-link active" style={{ color: "white" }}>Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
                </li>
              )}
              <li className="nav-item">
                <Link to='/add' className="nav-link active" aria-current="page" style={{ color: "white" }}>Add</Link>
              </li>
              <li className="nav-item">
                <Link to='/view' className="nav-link active" aria-current="page" style={{ color: "white" }}>View</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
