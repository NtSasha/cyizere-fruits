import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes for future */}
        <Route path="/login" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Login coming soon</h2></div>} />
        <Route path="/register" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Register coming soon</h2></div>} />
        <Route path="/shop" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Shop coming soon</h2></div>} />
        <Route path="/cart" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Cart coming soon</h2></div>} />
        <Route path="/orders" element={<div style={{padding: '10rem 5%', textAlign: 'center'}}><h2>Orders coming soon</h2></div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
