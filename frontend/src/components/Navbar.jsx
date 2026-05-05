import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Leaf, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };
  const [activeAnchor, setActiveAnchor] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Clear active anchor if user navigates away from home
  useEffect(() => {
    if (currentPath !== '/') {
      setActiveAnchor('');
    }
  }, [currentPath]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Shop', path: '/shop' },
    { name: 'Juice Bar', path: '/juice-bar' },
    { name: 'Coffee', path: '/coffee-bar' }
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
          <span>Cyizere Fruits</span>
        </Link>

        {/* Middle: Links (Desktop) */}
        <div className="nav-links-pill desktop-only">
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
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </Link>
          
          <div className="auth-buttons desktop-only">
            {user ? (
              <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={handleLogout} className="auth-btn">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={onLoginClick} className="auth-btn">
                  Login
                </button>
                <button onClick={onRegisterClick} className="auth-btn">
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <button className="close-menu" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  handleNavClick(e, link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`mobile-nav-item ${currentPath === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mobile-auth-actions">
            {user ? (
              <>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="mobile-auth-btn login">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} className="mobile-auth-btn login">
                  Login
                </button>
                <button onClick={() => { onRegisterClick(); setIsMobileMenuOpen(false); }} className="mobile-auth-btn register">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
