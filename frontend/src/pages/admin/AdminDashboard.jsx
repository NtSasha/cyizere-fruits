import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  MoreVertical,
  Edit3,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminDashboard.css';
import { getApiUrl } from '../../utils/api';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    pending: 0,
    totalCustomers: 0
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'fruits',
    unit: 'kg',
    image: '',
    badge: '',
    stock: 100
  });

  // Security Settings States
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.two_factor_enabled || false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const [ordersRes, countRes, revRes, pendingRes, productsRes, usersRes, topRes] = await Promise.all([
        fetch(getApiUrl(`/admin/orders?t=${Date.now()}`), { headers }),
        fetch(getApiUrl(`/admin/stats/orders-count?t=${Date.now()}`), { headers }),
        fetch(getApiUrl(`/admin/stats/revenue?t=${Date.now()}`), { headers }),
        fetch(getApiUrl(`/admin/stats/pending-orders?t=${Date.now()}`), { headers }),
        fetch(getApiUrl(`/products?t=${Date.now()}`)),
        fetch(getApiUrl(`/users?t=${Date.now()}`)),
        fetch(getApiUrl(`/admin/stats/top-products?t=${Date.now()}`), { headers })
      ]);

      const [ordersData, countData, revData, pendingData, productsData, usersData, topData] = await Promise.all([
        ordersRes.json(),
        countRes.json(),
        revRes.json(),
        pendingRes.json(),
        productsRes.json(),
        usersRes.json(),
        topRes.json()
      ]);

      setOrders(ordersData.orders || []);
      setStats({
        totalOrders: countData.total_orders || 0,
        revenue: revData.total_revenue || 0,
        pending: pendingData.pending_orders || 0,
        totalCustomers: usersData.length || 0
      });
      setProducts(productsData || []);
      setUsers(usersData || []);
      setTopProducts(topData.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(getApiUrl(`/admin/orders/${id}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast.success("Order status updated");
        await fetchAdminData();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleQuickStockUpdate = async (productId, delta) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      
      const newStock = Math.max(0, (product.stock || 0) + delta);
      
      // Update local state immediately for snappy feel
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, stock: newStock } : p
      ));

      const res = await fetch(getApiUrl(`/products/${productId}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          ...product,
          stock: newStock 
        })
      });

      if (!res.ok) {
        throw new Error("Failed to update stock");
        // Revert on error? In real app, yes.
      }
    } catch (error) {
      console.error("Stock update error:", error);
      toast.error("Failed to update stock");
      await fetchAdminData(); // Refresh to get correct data
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(getApiUrl(`/products/${id}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Product deleted successfully");
        await fetchAdminData();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct
        ? getApiUrl(`/products/${editingProduct.id}`)
        : getApiUrl('/products');

      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });

      if (res.ok) {
        toast.success(`Product ${editingProduct ? 'updated' : 'added'} successfully`);
        setEditingProduct(null);
        setProductForm({ name: '', price: '', category: 'fruits', unit: 'kg', image: '', badge: '', stock: 100 });
        setShowProductModal(false);
        await fetchAdminData();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      unit: product.unit,
      image: product.image,
      badge: product.badge || '',
      stock: product.stock || 100
    });
    setShowProductModal(true);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/users/change-password'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password updated successfully");
        setIsChangingPassword(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA = async () => {
    const newState = !is2FAEnabled;
    try {
      const res = await fetch(getApiUrl('/users/toggle-2fa'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ enabled: newState })
      });

      if (res.ok) {
        setIs2FAEnabled(newState);
        toast.success(`2FA ${newState ? 'enabled' : 'disabled'}`);
      } else {
        toast.error("Failed to update 2FA status");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo.png" alt="Cyizere Fruits" className="admin-logo" />
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} />
            <span>Orders</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} />
            <span>Products</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={20} />
            <span>Customers</span>
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-avatar">{user.name.charAt(0)}</div>
            <div className="admin-user-details">
              <span className="admin-name">{user.name}</span>
              <span className="admin-role">Super Admin</span>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

          {(activeTab === 'products' || activeTab === 'customers') && (
            <div className="admin-search-wrapper">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <div className="admin-header-actions">
            <button className="admin-refresh-btn" onClick={fetchAdminData}>
              Refresh Data
            </button>
          </div>
        </header>

        {loading ? (
          <div className="admin-loading">Loading dashboard...</div>
        ) : (
          <div className="admin-content">
            {activeTab === 'overview' && (
              <>
                <div className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <div className="stat-icon revenue">
                      <TrendingUp size={20} />
                    </div>
                    <div className="stat-info">
                      <p>Total Revenue</p>
                      <h3>RWF {Number(stats.revenue).toLocaleString()}</h3>
                    </div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-icon orders">
                      <ShoppingBag size={20} />
                    </div>
                    <div className="stat-info">
                      <p>Total Orders</p>
                      <h3>{stats.totalOrders}</h3>
                    </div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-icon pending">
                      <Clock size={20} />
                    </div>
                    <div className="stat-info">
                      <p>Pending Orders</p>
                      <h3>{stats.pending}</h3>
                    </div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-icon customers">
                      <Users size={20} />
                    </div>
                    <div className="stat-info">
                      <p>Total Customers</p>
                      <h3>{stats.totalCustomers}</h3>
                    </div>
                  </div>
                </div>

                <div className="admin-overview-grid">
                  <div className="admin-recent-orders">
                    <div className="section-header">
                      <h2>Recent Orders</h2>
                      <button onClick={() => setActiveTab('orders')} className="view-all-btn">View All</button>
                    </div>
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map(order => (
                            <tr key={order.id}>
                              <td>#CF-{order.id.toString().padStart(4, '0')}</td>
                              <td>{new Date(order.created_at).toLocaleDateString()}</td>
                              <td>RWF {Number(order.total_price).toLocaleString()}</td>
                              <td>
                                <span className={`status-badge ${order.status}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <select
                                  className="status-select"
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && (
                            <tr>
                              <td colSpan="5" className="empty-state">No orders found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="admin-recent-orders">
                    <div className="section-header">
                      <h2>Top Selling</h2>
                    </div>
                    <div className="top-products-list">
                      {topProducts.slice(0, 5).map((product, idx) => (
                        <div key={idx} className="top-product-item">
                          <div className="top-product-main">
                            <div className="product-rank">{idx + 1}</div>
                            <div className="top-product-img">
                              <img src={product.image || '/apple.jpg'} alt={product.name} />
                            </div>
                            <div className="top-product-details">
                              <span className="product-name-text">{product.name}</span>
                              <span className="product-category-text">{product.category}</span>
                            </div>
                          </div>
                          <div className="top-product-sales">
                            <span className="sales-count">{product.total_sold}</span>
                            <span className="sales-label">sold</span>
                          </div>
                        </div>
                      ))}
                      {topProducts.length === 0 && (
                        <div className="empty-state">No sales data yet.</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="admin-recent-orders full-page">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>#CF-{order.id.toString().padStart(4, '0')}</td>
                        <td>{new Date(order.created_at).toLocaleString()}</td>
                        <td>RWF {Number(order.total_price).toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="status-select"
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="admin-recent-orders full-page">
                <div className="section-header">
                  <h2>Manage Products</h2>
                  <button
                    className="add-product-btn"
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({ name: '', price: '', category: 'fruits', unit: 'kg', image: '', badge: '', stock: 100 });
                      setShowProductModal(true);
                    }}
                  >
                    + Add Product
                  </button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id}>
                        <td><img src={product.image} alt={product.name} className="admin-product-img" /></td>
                        <td>{product.name}</td>
                        <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                        <td>RWF {Number(product.price).toLocaleString()}</td>
                        <td>
                          <div className="stock-control-wrapper">
                            <button 
                              className="stock-adjust-btn minus"
                              onClick={() => handleQuickStockUpdate(product.id, -1)}
                            >
                              -
                            </button>
                            <div className={`stock-badge-container ${product.stock <= 10 ? 'low' : ''}`}>
                              <span className={`stock-badge ${product.stock <= 5 ? 'critical' : product.stock <= 15 ? 'low' : 'healthy'}`}>
                                {product.stock} {product.unit || 'pcs'}
                              </span>
                            </div>
                            <button 
                              className="stock-adjust-btn plus"
                              onClick={() => handleQuickStockUpdate(product.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="action-btns">
                          <button
                            className="action-btn edit"
                            onClick={() => openEditModal(product)}
                            title="Edit Product"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteProduct(product.id)}
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" className="empty-state">No products found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="admin-recent-orders full-page">
                <div className="section-header">
                  <h2>Customer Directory</h2>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td>#{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone || 'N/A'}</td>
                        <td>
                          <span className={`status-badge ${u.role === 'admin' ? 'delivered' : 'processing'}`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="admin-settings-container">
                <div className="settings-section">
                  <h3>General Settings</h3>
                  <div className="settings-card">
                    <div className="settings-row">
                      <div className="settings-info">
                        <h4>Store Name</h4>
                        <p>Change your store's public name</p>
                      </div>
                      <input type="text" defaultValue="Cyizere Fruits" className="settings-input" />
                    </div>
                    <div className="settings-row">
                      <div className="settings-info">
                        <h4>Contact Email</h4>
                        <p>Emails will be sent from this address</p>
                      </div>
                      <input type="email" defaultValue="admin@cyizerefruits.rw" className="settings-input" />
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Security</h3>
                  <div className="settings-card">
                    <div className="settings-row">
                      <div className="settings-info">
                        <h4>Admin Password</h4>
                        <p>Last changed 2 months ago</p>
                      </div>
                      <button
                        className="settings-btn-outline"
                        onClick={() => setIsChangingPassword(!isChangingPassword)}
                      >
                        {isChangingPassword ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>

                    {isChangingPassword && (
                      <div className="password-change-form">
                        <form onSubmit={handlePasswordChange}>
                          <div className="form-group">
                            <label>Current Password</label>
                            <input
                              type="password"
                              required
                              value={passwordForm.currentPassword}
                              onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            />
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                required
                                value={passwordForm.newPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              />
                            </div>
                            <div className="form-group">
                              <label>Confirm New Password</label>
                              <input
                                type="password"
                                required
                                value={passwordForm.confirmPassword}
                                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              />
                            </div>
                          </div>
                          <button type="submit" className="settings-btn-primary" style={{ marginTop: '10px' }}>
                            Update Password
                          </button>
                        </form>
                      </div>
                    )}

                    <div className="settings-row">
                      <div className="settings-info">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security</p>
                      </div>
                      <div
                        className={`toggle-switch ${is2FAEnabled ? 'active' : ''}`}
                        onClick={handleToggle2FA}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Payments</h3>
                  <div className="settings-card">
                    <div className="settings-row">
                      <div className="settings-info">
                        <h4>Flutterwave Integration</h4>
                        <p>Current status: <span style={{ color: '#22c55e', fontWeight: '600' }}>Active</span></p>
                      </div>
                      <button className="settings-btn-outline">Configure API</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showProductModal && (
          <div className="admin-modal-overlay" onClick={() => setShowProductModal(false)}>
            <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button className="admin-close-modal" onClick={() => setShowProductModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleProductSubmit} className="admin-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (RWF)</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Level</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={e => setProductForm({ ...productForm, stock: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    >
                      <option value="fruits">Fruits</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="organic">Organic</option>
                      <option value="fruit-packs">Fruit Packs</option>
                      <option value="juices">Juices</option>
                      <option value="seasonal">Seasonal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Unit (kg/pc)</label>
                    <input
                      type="text"
                      value={productForm.unit}
                      onChange={e => setProductForm({ ...productForm, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={productForm.image}
                      onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Badge (Optional)</label>
                    <input
                      type="text"
                      value={productForm.badge}
                      onChange={e => setProductForm({ ...productForm, badge: e.target.value })}
                      placeholder="e.g. Bestseller"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setShowProductModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
