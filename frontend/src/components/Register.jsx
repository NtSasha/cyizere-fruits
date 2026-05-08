import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css'; 
import { getApiUrl } from '../utils/api';

const Register = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, openLogin } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  // Reset form when modal state changes
  React.useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
    });
    setError(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let data;
    
    try {
      const response = await fetch(getApiUrl('/users/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });
      
      data = await response.json();
      
      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map(err => err.msg).join('. '));
        }
        throw new Error(data.message || data.error || 'Failed to register');
      }
      
      toast.success('Account created successfully!');
      login(data.user, data.token);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
      });
      onClose();
    } catch (err) {
      console.error("Registration technical info:", err);
      
      let friendlyMessage = err.message;
      
      if (err.message.includes('Failed to fetch')) {
        friendlyMessage = "Connection failed. Is the server running?";
      } else if (err.message.includes('already exists')) {
        friendlyMessage = "This email is already registered. Try logging in instead!";
      } else if (!data?.errors && !data?.message) {
        // Fallback for unexpected errors
        friendlyMessage = "We couldn't create your account right now. Please try again later.";
      }
      
      setError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content register-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-modal-body">
          <div className="auth-modal-header">
            <h2>Create Account</h2>
            <p>Join our community of fresh fruit lovers.</p>
          </div>

          {error && <div className="auth-error-message" style={{ color: 'red', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

          <form className="auth-modal-form" onSubmit={handleSubmit}>
            <div className="modal-form-group">
              <label>Full Name</label>
              <div className="modal-input-wrapper">
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required 
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="modal-form-group">
              <label>Email Address</label>
              <div className="modal-input-wrapper">
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="modal-form-group">
              <label>Phone Number</label>
              <div className="modal-input-wrapper">
                <input 
                  type="tel" 
                  placeholder="+250 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="modal-form-group">
              <label>Password</label>
              <div className="modal-input-wrapper">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button type="submit" className="modal-primary-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="auth-modal-footer">
              <p>Already have an account? <button type="button" onClick={openLogin} className="auth-switch-btn">Sign in</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
