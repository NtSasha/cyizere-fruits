import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Clock, CheckCircle, XCircle, Package, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApiUrl } from '../utils/api';
import './MyOrders.css';

const MyOrders = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/shop');
      return;
    }
    fetchOrders();
  }, [user, token]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(getApiUrl('/orders/my-orders'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    setModalLoading(true);
    try {
      const res = await fetch(getApiUrl(`/orders/${orderId}/details`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedOrder(data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="my-orders-page">
        <div className="orders-container">
          <div className="orders-loading">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <div className="orders-container">

        {orders.length === 0 ? (
          <div className="empty-orders-container">
            <div className="empty-orders-content">
              <div className="empty-orders-icon">
                <ShoppingBag size={80} />
              </div>
              <h1>No orders yet</h1>
              <p>You haven't placed any orders with us yet. Explore our fresh fruits and vegetables!</p>
              <button className="go-shop-btn" onClick={() => navigate('/shop')}>
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id-section">
                    <span className="order-id">Order #CF-{order.id.toString().padStart(4, '0')}</span>
                    <span className="order-date">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span className={`order-status ${order.status}`}>
                    {order.status === 'paid' && <CheckCircle size={14} style={{ marginRight: '4px' }} />}
                    {order.status === 'pending' && <Clock size={14} style={{ marginRight: '4px' }} />}
                    {order.status === 'cancelled' && <XCircle size={14} style={{ marginRight: '4px' }} />}
                    {order.status}
                  </span>
                </div>
                <div className="order-card-body">
                  <div className="order-info">
                    <span className="order-total-label">Total Amount</span>
                    <span className="order-total-amount">RWF {Number(order.total_price).toLocaleString()}</span>
                  </div>
                  <button
                    className="view-details-btn"
                    onClick={() => fetchOrderDetails(order.id)}
                  >
                    View Details
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal-content" onClick={e => e.stopPropagation()}>
            <div className="order-modal-header">
              <h2>Order Details #CF-{selectedOrder.order.toString().padStart(4, '0')}</h2>
              <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>
            <div className="order-modal-body">
              <div className="modal-section-title">
                <Package size={18} />
                <span>Order Items</span>
              </div>
              <div className="modal-items-list">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="modal-item">
                    <div className="modal-item-info">
                      <span className="modal-item-name">{item.product}</span>
                      <span className="modal-item-qty">{item.quantity} x RWF {Number(item.price).toLocaleString()}</span>
                    </div>
                    <span className="modal-item-price">RWF {(item.quantity * item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="modal-summary">
                <div className="modal-summary-row">
                  <span>Subtotal</span>
                  <span>RWF {Number(selectedOrder.total_price).toLocaleString()}</span>
                </div>
                <div className="modal-summary-row">
                  <span>Delivery Fee</span>
                  <span>RWF 2,000</span>
                </div>
                <div className="modal-summary-row total">
                  <span>Total</span>
                  <span>RWF {(Number(selectedOrder.total_price) + 2000).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
