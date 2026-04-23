import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Leaf } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [activeAnchor, setActiveAnchor] = useState('');

  // Clear active anchor if user navigates away from home
  useEffect(() => {
    if (currentPath !== '/') {
      setActiveAnchor('');
    }
  }, [currentPath]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '#categories' },
    { name: 'Shop', path: '/shop' },
    { name: 'Juice Bar', path: '/juice-bar' },
    { name: 'Coffee', path: '/coffee' }
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      setActiveAnchor(path);
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/' + path);
      }
    } else {
      setActiveAnchor('');
    }
  };

  return (
    <nav className="pill-navbar-wrapper">
      <div className="pill-navbar">
        {/* Left Side: Aesthetic Logo */}
        <Link to="/" className="nav-brand fancy-logo" onClick={() => setActiveAnchor('')}>
          <img src="/logo.png" alt="Cyizere Logo" style={{height: '40px'}} />
          Cyizere Fruits
        </Link>

        {/* Middle: Links */}
        <div className="nav-links-pill">
          {navLinks.map((link) => {
            const isAnchor = link.path.startsWith('#');
            const isActive = isAnchor 
              ? activeAnchor === link.path 
              : currentPath === link.path && activeAnchor === '';

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Actions */}
        <div className="nav-actions-right">
          
          <Link to="/cart" className="action-icon">
            <ShoppingCart size={20} />
            <span className="cart-dot"></span>
          </Link>
          
          <div className="auth-buttons">
            <button onClick={onLoginClick} className="auth-btn">
              Login
            </button>
            <button onClick={onRegisterClick} className="auth-btn">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
