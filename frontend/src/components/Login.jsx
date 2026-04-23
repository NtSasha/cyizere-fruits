import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const Login = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-modal-body">
          <div className="auth-modal-header">
            <h2>Welcome Back!</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          <form className="auth-modal-form" onSubmit={handleSubmit}>
            <div className="modal-form-group">
              <label>Email</label>
              <div className="modal-input-wrapper">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="modal-form-group">
              <label>Password</label>
              <div className="modal-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="modal-form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="modal-primary-btn">Sign in</button>

            <button type="button" className="modal-google-btn">
              <FcGoogle size={20} />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
