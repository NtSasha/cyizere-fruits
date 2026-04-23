import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Leaf } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Products', path: '/products' },
    { name: 'Shop', path: '/shop' },
    { name: 'Orders', path: '/orders' }
  ];

  return (
    <nav className="pill-navbar-wrapper">
      <div className="pill-navbar">
        {/* Left Side: Aesthetic Logo */}
        <Link to="/" className="nav-brand fancy-logo">
          <img src="/logo.png" alt="Cyizere Logo" style={{height: '40px'}} />
          Cyizere Fruits
        </Link>

        {/* Middle: Links */}
        <div className="nav-links-pill">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
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
