import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
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
        {/* Placeholder routes for future */}
        <Route path="/login" element={<div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><h2>Login coming soon</h2></div>} />
        <Route path="/register" element={<div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}><h2>Register coming soon</h2></div>} />
        <Route path="/shop" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Shop coming soon</h2></div>} />
        <Route path="/cart" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Cart coming soon</h2></div>} />
        <Route path="/juice-bar" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Juice Bar coming soon</h2></div>} />
        <Route path="/coffee" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Coffee coming soon</h2></div>} />
      </Routes>
      <Footer />

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
}

export default App;
