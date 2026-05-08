import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Shop from './pages/Shop';
import JuiceBuilder from './pages/JuiceBuilder';
import CoffeeBuilder from './pages/CoffeeBuilder';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoginOpen, isRegisterOpen, openLogin, openRegister, closeModals } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#fff',
            color: '#1a1a1a',
            fontFamily: 'Outfit, sans-serif',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #eaeaea'
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
        }}
      />
      {!isAdminRoute && <Navbar onLoginClick={openLogin} onRegisterClick={openRegister} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/juice-bar" element={<JuiceBuilder />} />
        <Route path="/coffee-bar" element={<CoffeeBuilder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* Placeholder routes for future */}
        <Route path="/login" element={<div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><h2>Login coming soon</h2></div>} />
        <Route path="/register" element={<div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><h2>Register coming soon</h2></div>} />
      </Routes>
      {!isAdminRoute && <Footer />}

      <Login isOpen={isLoginOpen} onClose={closeModals} />
      <Register isOpen={isRegisterOpen} onClose={closeModals} />
    </>
  );
}

export default App;
