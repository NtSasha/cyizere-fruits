import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import './Login.css'; 

const Register = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-modal-body">
          <div className="auth-modal-header">
            <h2>Create Account</h2>
            <p>Join our community of fresh fruit lovers.</p>
          </div>

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
                />
              </div>
            </div>

            <button type="submit" className="modal-primary-btn">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
