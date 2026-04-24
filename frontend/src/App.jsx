import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setIsLoginOpen(true)} onRegisterClick={() => setIsRegisterOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/juice-bar" element={<JuiceBuilder />} />
        <Route path="/coffee-bar" element={<CoffeeBuilder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Placeholder routes for future */}
        <Route path="/login" element={<div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><h2>Login coming soon</h2></div>} />
        <Route path="/register" element={<div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><h2>Register coming soon</h2></div>} />
      </Routes>
      <Footer />

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
}

export default App;
