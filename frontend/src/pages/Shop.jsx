import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Filter, X, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Shop.css';
import { getApiUrl } from '../utils/api';

const ProductCard = ({ product, onAddToCart }) => {
  const getBadgeClass = (badge) => {
    if (!badge) return '';
    const b = badge.toLowerCase();
    if (b.includes('new')) return 'badge-new';
    if (b.includes('organic')) return 'badge-organic';
    if (b.includes('best') || b.includes('popular')) return 'badge-bestseller';
    if (b.includes('deal') || b.includes('off')) return 'badge-deal';
    return '';
  };

  return (
    <div 
      className="featured-product-card"
      onClick={(e) => {
        e.currentTarget.classList.add('clicked-anim');
        setTimeout(() => e.currentTarget.classList.remove('clicked-anim'), 400);
      }}
    >
      <div className="fp-img-wrap">
        {product.badge && (
          <span className={`fp-badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="fp-info">
        <h3 className="fp-title">{product.name}</h3>
        <p className="fp-unit">{product.unit}</p>
        <div className="fp-footer">
          <div className="fp-price-wrap">
            <span className="fp-price">
              RWF {product.price.toLocaleString()}
            </span>
          </div>
          <button 
            className="fp-cart-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(getApiUrl(`/products?t=${Date.now()}`));
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data);
        } else {
          console.error("Failed to fetch products from backend");
        }
      } catch (error) {
        console.error("Network error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fresh Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'juices', name: 'Juices' },
    { id: 'fruit-packs', name: 'Fruit Packs' },
    { id: 'organic', name: 'Organic' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  // Products are now fetched from the database!

  const filteredProducts = allProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Helper to rank image types: Original (1) > Placeholders (2) > Generated (3)
      const getRank = (img) => {
        if (!img) return 4;
        if (img.includes('-new.png')) return 3;
        if (img.includes('/fruits.png') || img.includes('/vegetables.png') || img.includes('/fruit-packs.png')) return 2;
        return 1;
      };

      const rankA = getRank(a.image);
      const rankB = getRank(b.image);

      if (rankA !== rankB) {
        return rankA - rankB;
      }
      
      // Secondary sort: Keep consistent order within ranks
      return a.name.localeCompare(b.name);
    });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        {/* Row 1: Search Bar Only */}
        <div className="shop-search-row">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Category Filters & View Toggle */}
        <div className="shop-filter-row">
          <div className="filters-group">
            <div className="quick-filters">
              {categories.map(cat => (
                <span 
                  key={cat.id}
                  className={`quick-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </span>
              ))}
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="shop-products-wrapper">
          {loading ? (
            <div className="no-products">
              <h3>Loading products...</h3>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={`shop-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">
                <Filter size={48} />
              </div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// End of Shop Page component
export default Shop;

