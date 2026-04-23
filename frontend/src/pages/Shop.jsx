import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Filter, X, ChevronDown, LayoutGrid, List } from 'lucide-react';
import './Shop.css';

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
      className="templated-product-card"
      onClick={(e) => {
        e.currentTarget.classList.add('clicked-anim');
        setTimeout(() => e.currentTarget.classList.remove('clicked-anim'), 400);
      }}
    >
      <div className="tp-img-wrap">
        {product.badge && (
          <span className={`tp-badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="tp-info">
        <h3 className="tp-title">{product.name}</h3>
        <div className="tp-footer">
          <div className="tp-price-wrap">
            <span className="tp-price">
              RWF {product.price.toLocaleString()} <span className="unit-text">/{product.unit}</span>
            </span>
          </div>
          <button 
            className="tp-cart-btn" 
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

  const allProducts = [
    {
      id: 1,
      name: 'Fresh Lettuce',
      category: 'vegetables',
      categoryLabel: 'vegetables',
      price: 1200,
      unit: 'kg',
      image: '/lettuce.jpg',
      badge: 'Organic'
    },
    {
      id: 2,
      name: 'Organic Bananas',
      category: 'fruits',
      categoryLabel: 'fruits',
      price: 2200,
      unit: 'bunch',
      image: '/banana.jpg',
      badge: 'Bestseller'
    },
    {
      id: 3,
      name: 'Red Pepper',
      category: 'organic',
      categoryLabel: 'organic',
      price: 5000,
      unit: 'kg',
      image: '/pepper.jpg',
      badge: 'Hot Deal'
    },
    {
      id: 4,
      name: 'Green Peas',
      category: 'vegetables',
      categoryLabel: 'vegetables',
      price: 1800,
      unit: '500g',
      image: '/peas.jpg',
      badge: 'New Arrival'
    },
    {
      id: 5,
      name: 'Valencia Oranges',
      category: 'fruits',
      categoryLabel: 'fruits',
      price: 2000,
      unit: 'kg',
      image: '/orange.jpg',
      badge: 'Seasonal'
    },
    {
      id: 6,
      name: 'Potatoes',
      category: 'vegetables',
      categoryLabel: 'vegetables',
      price: 3200,
      unit: 'kg',
      image: '/Potatoes.jpg'
    },
    {
      id: 7,
      name: 'Fresh Kale',
      category: 'organic',
      categoryLabel: 'organic',
      price: 1200,
      unit: 'bunch',
      image: '/organic-new.png',
      badge: 'New'
    },
    {
      id: 8,
      name: 'Mixed Fruit Pack',
      category: 'fruit-packs',
      categoryLabel: 'packs',
      price: 15000,
      unit: 'pack',
      image: '/fruit-packs.png',
      badge: 'Popular'
    },
    {
      id: 9,
      name: 'Tropical Fruit Basket',
      category: 'fruit-packs',
      categoryLabel: 'baskets',
      price: 25000,
      unit: 'basket',
      image: '/fruit-basket.png',
      badge: 'Deal'
    },
    {
      id: 10,
      name: 'Fresh Pineapple',
      category: 'fruits',
      categoryLabel: 'fruits',
      price: 1800,
      unit: 'pc',
      image: '/pineapple.png',
      badge: 'Sweet'
    },
    {
      id: 11,
      name: 'Eggplant',
      category: 'vegetables',
      categoryLabel: 'vegetables',
      price: 2200,
      unit: 'kg',
      image: '/eggplant.png'
    },
    {
      id: 12,
      name: 'Fresh cabbage',
      category: 'organic',
      categoryLabel: 'organic',
      price: 4500,
      unit: 'kg',
      image: '/cabbage.jpg',
      badge: 'Organic'
    },
    {
      id: 13,
      name: 'Fresh Avocado',
      category: 'fruits',
      categoryLabel: 'fruits',
      price: 1500,
      unit: 'pc',
      image: '/fruits.png',
      badge: 'New'
    },
    {
      id: 14,
      name: 'Sweet Potatoes',
      category: 'vegetables',
      categoryLabel: 'vegetables',
      price: 2000,
      unit: 'kg',
      image: '/sweet-potatoes.jpg'
    },
    {
      id: 15,
      name: 'Green Cucumber',
      category: 'vegetables',
      categoryLabel: 'vegetables',
      price: 800,
      unit: 'pc',
      image: '/cucumber.jpg',
      badge: 'Organic'
    },
    {
      id: 16,
      name: 'Ripe Mangoes',
      category: 'fruits',
      categoryLabel: 'fruits',
      price: 3000,
      unit: 'kg',
      image: '/mango.jpg',
      badge: 'New'
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    console.log(`Added to cart: ${product.name}`);
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
            </div>

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

        {/* Products Grid */}
        <div className="shop-products-wrapper">
          {filteredProducts.length > 0 ? (
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

export default Shop;
