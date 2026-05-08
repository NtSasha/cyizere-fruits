import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, User, Mail, CreditCard, ChevronRight, CheckCircle, Truck, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import './Checkout.css';
import { getApiUrl } from '../utils/api';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, openLogin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      openLogin();
      navigate('/shop');
    }
  }, [user, navigate, openLogin]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kigali',
    paymentMethod: 'cod'
  });

  const deliveryFee = cartTotal > 0 ? 2000 : 0;
  const total = cartTotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  let paymentOptions = 'card,mobilemoneyrwanda';
  if (formData.paymentMethod === 'mtn' || formData.paymentMethod === 'airtel') {
    paymentOptions = 'mobilemoneyrwanda';
  } else if (formData.paymentMethod === 'card') {
    paymentOptions = 'card';
  }

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY || 'FLWPUBK_TEST-64c1de8bf596fb914982ba76e1cf68f4-X',
    tx_ref: Date.now().toString(),
    amount: total,
    currency: 'RWF',
    payment_options: paymentOptions,
    customer: {
      email: formData.email,
      phone_number: formData.phone,
      name: formData.fullName,
    },
    customizations: {
      title: 'Cyizere Fruits',
      description: 'Payment for your fresh fruits and juices',
      logo: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'cod') {
        try {
            const res = await fetch(getApiUrl('/payment/verify'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transaction_id: 'COD',
                items: cartItems,
                customer: formData
              })
            });

            if (res.ok) {
              setStep(3); // Go to Success step
              setTimeout(() => {
                clearCart();
                setFormData({
                  fullName: '', email: '', phone: '', address: '', city: 'Kigali', paymentMethod: 'cod'
                });
              }, 500);
            } else {
              console.error("Failed to save COD order to backend");
              alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Error communicating with backend:", error);
            alert("Error communicating with the server.");
        }
        return;
    }
    
    handleFlutterPayment({
      callback: async (response) => {
        console.log("Payment successful:", response);
        if (response.status === "successful" || response.status === "completed") {
          
          try {
            // Verify payment and save order to the backend
            const res = await fetch(getApiUrl('/payment/verify'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transaction_id: response.transaction_id,
                items: cartItems,
                customer: formData
              })
            });

            if (res.ok) {
              const data = await res.json();
              console.log("Order verified and saved:", data);
              setStep(3); // Go to Success step
              setTimeout(() => {
                clearCart();
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: 'Kigali',
                  paymentMethod: 'mtn'
                });
              }, 500);
            } else {
              console.error("Failed to save order to backend");
              // Still show success since payment went through, but log error
              setStep(3);
              setTimeout(() => {
                clearCart();
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: 'Kigali',
                  paymentMethod: 'mtn'
                });
              }, 500);
            }
          } catch (error) {
            console.error("Error communicating with backend:", error);
            setStep(3);
            setTimeout(() => {
              clearCart();
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                address: '',
                city: 'Kigali',
                paymentMethod: 'mtn'
              });
            }, 500);
          }
        }
        closePaymentModal(); // Close modal programmatically
      },
      onClose: () => {
        console.log("Payment modal closed by user");
      },
    });
  };

  if (cartItems.length === 0 && step !== 3) {
    navigate('/shop');
    return null;
  }

  if (step === 3) {
    return (
      <div className="checkout-success">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with Cyizere Fruits. Your order is being prepared and will be delivered shortly.</p>
          <div className="order-details-brief">
            <p><strong>Order ID:</strong> #CF-{Math.floor(Math.random() * 100000)}</p>
            <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
          </div>
          <button className="home-btn" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate('/cart')}>
          <ArrowLeft size={20} />
          <span>Back to Cart</span>
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-title">
              <User size={20} />
              <h2>Personal Information</h2>
            </div>
            <div className="input-group">
              <div className="input-field">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Enter your full name" 
                    required 
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-field">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="example@mail.com" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <MapPin size={20} />
              <h2>Delivery Details</h2>
            </div>
            <div className="input-group">
              <div className="input-field full">
                <label>Delivery Address</label>
                <div className="input-with-icon">
                  <MapPin size={18} />
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Street, Apartment, Villa" 
                    required 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-field">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={18} />
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="+250 7XX XXX XXX" 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="input-field">
                <label>City</label>
                <select name="city" value={formData.city} onChange={handleInputChange}>
                  <option value="Kigali">Kigali</option>
                  <option value="Musanze">Musanze</option>
                  <option value="Rubavu">Rubavu</option>
                  <option value="Huye">Huye</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <CreditCard size={20} />
              <h2>Payment Method</h2>
            </div>
            <div className="payment-options">
              <label className={`payment-card ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <div className="payment-icon-wrap">
                  <Truck size={24} />
                </div>
                <div className="payment-info">
                  <span className="payment-name">Cash on Delivery</span>
                  <span className="payment-desc">Pay when it arrives</span>
                </div>
              </label>

              <label className={`payment-card ${formData.paymentMethod === 'mtn' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="mtn" 
                  checked={formData.paymentMethod === 'mtn'}
                  onChange={handleInputChange}
                />
                <div className="payment-icon-wrap">
                  <Smartphone size={24} />
                </div>
                <div className="payment-info">
                  <span className="payment-name">MTN MoMo</span>
                  <span className="payment-desc">Rwanda Mobile Money</span>
                </div>
              </label>

              <label className={`payment-card ${formData.paymentMethod === 'airtel' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="airtel" 
                  checked={formData.paymentMethod === 'airtel'}
                  onChange={handleInputChange}
                />
                <div className="payment-icon-wrap">
                  <Smartphone size={24} />
                </div>
                <div className="payment-info">
                  <span className="payment-name">Airtel Money</span>
                  <span className="payment-desc">Airtel Rwanda</span>
                </div>
              </label>

              <label className={`payment-card ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                />
                <div className="payment-icon-wrap">
                  <CreditCard size={24} />
                </div>
                <div className="payment-info">
                  <span className="payment-name">Credit Card</span>
                  <span className="payment-desc">Visa / Mastercard</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
            <ChevronRight size={20} />
          </button>
        </form>

        <div className="checkout-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="item-info-sm">
                    <p className="item-name-sm">
                      <span className="item-qty-badge">{item.quantity}x</span>
                      {item.name}
                    </p>
                    <p className="item-price-sm">RWF {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-details-sm">
              <div className="summary-row-sm">
                <span>Subtotal</span>
                <span>RWF {cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-row-sm">
                <span>Delivery</span>
                <span>RWF {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="summary-divider-sm"></div>
              <div className="summary-row-sm total-sm">
                <span>Total</span>
                <span>RWF {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="delivery-promise">
              <Truck size={18} />
              <p>Fresh delivery within 45 mins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
