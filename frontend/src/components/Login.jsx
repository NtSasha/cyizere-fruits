import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';
import { getApiUrl } from '../utils/api';

const Login = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, openRegister } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Reset form when modal state changes
  React.useEffect(() => {
    setFormData({
      email: '',
      password: '',
    });
    setError(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(getApiUrl('/users/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to login');
      }
      
      toast.success('Welcome back!');
      login(data.user, data.token);
      setFormData({
        email: '',
        password: '',
      });
      onClose();
      
      if (data.user?.role === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      console.error("Login technical info:", err);
      const friendlyMessage = err.message.includes('Invalid') 
        ? "We couldn't find an account with those details. Please check your email and password."
        : "We're having trouble logging you in. Please try again in a moment.";
      
      setError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
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

          {error && <div className="auth-error-message" style={{ color: 'red', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

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
                  autoComplete="email"
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
                  autoComplete="current-password"
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

            <button type="submit" className="modal-primary-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <button type="button" className="modal-google-btn">
              <FcGoogle size={20} />
              Sign in with Google
            </button>

            <div className="auth-modal-footer">
              <p>Don't have an account? <button type="button" onClick={openRegister} className="auth-switch-btn">Sign up</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
