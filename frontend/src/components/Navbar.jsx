import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';  
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");  // bez przeładowania strony
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">MojaAplikacja</Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/courses" className="navbar-link">Kursy</Link>
        <Link to="/about" className="navbar-link">O nas</Link>

        {isLoggedIn && user ? (
          <>
            <span className="navbar-user">Witaj, {user.username}!</span>
            <button onClick={handleLogout} className="navbar-button">Wyloguj się</button>
          </>
        ) : (
          <Link to="/login" className="navbar-button">Zaloguj się</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
