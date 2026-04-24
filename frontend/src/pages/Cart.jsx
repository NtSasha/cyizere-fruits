import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const deliveryFee = cartTotal > 0 ? 2000 : 0;
  const total = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">
            <ShoppingBag size={80} />
          </div>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything to your cart yet. Explore our fresh fruits and vegetables!</p>
          <button className="go-shop-btn" onClick={() => navigate('/shop')}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate('/shop')}>
          <ArrowLeft size={20} />
          <span>Continue Shopping</span>
        </button>
        <h1>My shopping cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items-section">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-price">RWF {item.price.toLocaleString()} / {item.unit}</p>
                  </div>
                  
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="item-subtotal">
                      <span>RWF {(item.price * item.quantity).toLocaleString()}</span>
                    </div>

                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-section">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>RWF {cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `RWF ${deliveryFee.toLocaleString()}`}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>RWF {total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="promo-code">
              <input type="text" placeholder="Promo Code" />
              <button>Apply</button>
            </div>

            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
              <ChevronRight size={20} />
            </button>
            
            <div className="secure-checkout">
              <p>Secure Checkout Guaranteed</p>
              <div className="payment-icons">
                <div className="payment-icon">M-Pesa</div>
                <div className="payment-icon">MTN</div>
                <div className="payment-icon">Visa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
