import React, { useEffect } from 'react';
import { ArrowRight, ShoppingCart, Apple, Grape, Carrot, ShieldCheck, Truck, Clock, Droplet, Package, Leaf, Search, ChevronDown, LayoutGrid, List, GlassWater, Tag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero" style={{ backgroundImage: "url('/hero.png')" }}>
        <div className="hero-content animate-up">
          <h1>Freshness delivered <br />to your doorstep.</h1>
          <p>Hand-picked, organic groceries sourced directly from local farms.</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/shop" className="hero-btn">
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Category Section */}
      <section className="categories" id="categories">
        <div className="categories-header">
          <h2>Shop by categories</h2>
          <p>Freshly sourced organic produce curated just for your daily needs.</p>
        </div>
        <div className="categories-scroll-wrapper">
          <div className="circular-category-grid">
            {[
              { name: 'Fruits', image: '/fruits.png' },
              { name: 'Vegetables', image: '/vegetables.png' },
              { name: 'Juices', image: '/juices.png', scale: '0.85' },
              { name: 'Coffee', image: '/coffee.png', scale: '1' },
              { name: 'Organic Products', image: '/organic-new.png', scale: '1.3', objectPosition: 'center 40%' },
            ].map((cat, index) => (
              <div className="circular-cat-card" key={index}>
                <div className="circular-cat-img">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="cat-img-element"
                    style={{
                      transform: cat.scale ? `scale(${cat.scale})` : 'none',
                      objectFit: cat.objectFit || 'contain',
                      objectPosition: cat.objectPosition || 'center'
                    }}
                  />
                </div>
                <h3 className="circular-cat-title">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Produce with Carousel */}
      <section className="featured-produce-section" id="products">
        <div className="featured-header">
          <h2 className="featured-title">Featured products</h2>
        </div>

        <div className="featured-search-container">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search for products..." />
          </div>
          <div className="controls-right">
            <div className="sort-dropdown-container">
              <select className="sort-dropdown">
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="low-to-high">Price Low to High</option>
                <option value="high-to-low">Price High to Low</option>
              </select>
              <ChevronDown size={14} className="sort-icon" />
            </div>

            <div className="quick-filters">
              <span className="quick-chip">Organic</span>
              <span className="quick-chip">On Sale</span>
              <span className="quick-chip">Fresh Today</span>
            </div>

            <div className="view-toggle">
              <button className="view-btn active" title="Grid View">
                <LayoutGrid size={18} />
              </button>
              <button className="view-btn" title="List View">
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="product-carousel-container">
          <div className="product-carousel">
            {[
              { id: 1, name: 'Fresh lettuce', price: 'RWF 1,200', unit: '1 Kg', category: 'Vegetables', img: '/lettuce.jpg' },
              { id: 2, name: 'Brocoli', price: 'RWF 2,500', unit: '1 Kg', category: 'Fruits', img: '/brocoli.jpg' },
              { id: 3, name: 'Pineapple', price: 'RWF 4,500', unit: '500g', category: 'Fruits', img: '/pineapple.png' },
              { id: 4, name: 'Eggplant', price: 'RWF 8,000', unit: '250g', category: 'Coffee', img: '/eggplant.png' },
              { id: 5, name: 'Carrots', price: 'RWF 3,500', unit: 'Pack', category: 'Organic', img: '/Carrots.jpg' },
              { id: 6, name: 'Fresh green peas', price: 'RWF 1,800', unit: '500g', category: 'Vegetables', img: '/peas.jpg' },
              { id: 7, name: 'Oranges', price: 'RWF 2,000', unit: '500ml', category: 'Juices', img: '/orange.jpg' },
              { id: 8, name: 'Sweet potatoes', price: 'RWF 1,500', unit: '1 Kg', category: 'Fruits', img: '/sweet-potatoes.jpg' },
              { id: 9, name: 'Potatoes', price: 'RWF 3,200', unit: '1 Kg', category: 'Fruits', img: '/Potatoes.jpg' },
              { id: 10, name: 'Fresh cabbage', price: 'RWF 1,000', unit: '1 Kg', category: 'Vegetables', img: '/cabbage.jpg' },
              { id: 11, name: 'Organic bananas', price: 'RWF 2,200', unit: '1 Bunch', category: 'Fruits', img: '/banana.jpg' },
              { id: 12, name: 'Cucumber', price: 'RWF 800', unit: 'Pack', category: 'Vegetables', img: '/cucumber.jpg' },
              { id: 13, name: 'Fresh mangoes', price: 'RWF 2,500', unit: '1 Kg', category: 'Fruits', img: '/mango.jpg' },
              { id: 14, name: 'Pepper', price: 'RWF 5,000', unit: '500g', category: 'Organic', img: '/pepper.jpg' },
            ].map(product => (
              <div
                className="templated-product-card"
                key={product.id}
                onClick={(e) => {
                  e.currentTarget.classList.add('clicked-anim');
                  setTimeout(() => e.currentTarget.classList.remove('clicked-anim'), 400);
                }}
              >
                <div className="tp-img-wrap">
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="tp-info">
                  <h3 className="tp-title">{product.name}</h3>
                  <div className="tp-footer">
                    <div className="tp-price-wrap">
                      <span className="tp-price">{product.price}</span>
                    </div>
                    <button className="tp-cart-btn" onClick={(e) => e.stopPropagation()}>
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 Promo Banners Section */}
      <section className="promo-banners-section">
        <div className="promo-banners-container">
          {/* Left: Deal of the Week */}
          <div className="banner-card deal-card">
            <div className="banner-content-v2">
              <span className="banner-text-highlight">20% OFF FOR THIS WEEK</span>
              <h2 className="banner-title-small">Fresh organic fruits</h2>

              <div className="banner-pricing-wrap">
                <span className="new-price">RWF 800</span>
                <span className="old-price">RWF 1,500</span>
              </div>

              <button className="banner-btn">Add to Cart</button>
            </div>
            <div className="banner-image-v2">
              <img src="/fruits.png" alt="Fresh fruits" />
            </div>
          </div>

          {/* Right: Promotion */}
          <div className="banner-card special-offer-card" style={{ backgroundImage: "url('/dark-groceries.png')" }}>
            <div className="banner-overlay"></div>
            <div className="banner-content-promo">
              <h2 className="promo-headline">Groceries in 2 Hours</h2>
              <p className="promo-subtext">Free delivery for orders above 10,000 Rwf</p>
              <button className="promo-btn-v2">Claim offer</button>
            </div>
          </div>
        </div>
      </section>



      {/* 6. Why Choose Us Section */}
      <section className="why-choose-us">
        <h2 className="section-title">Why choose us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Carrot size={28} /></div>
            <h3>Fresh produce</h3>
            <p>Carefully selected fresh fruits and vegetables every day</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Truck size={28} /></div>
            <h3>Fast delivery</h3>
            <p>Quick and reliable delivery to your doorstep</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><GlassWater size={28} /></div>
            <h3>Natural juices</h3>
            <p>Freshly made juices with no additives or preservatives</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Tag size={28} /></div>
            <h3>Affordable prices</h3>
            <p>High-quality products at fair and competitive prices</p>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container-compact">
          <h2>Subscribe for offers!</h2>
          <p>Join our mailing list for weekly farm-fresh arrivals and exclusive discounts.</p>
          
          <form className="newsletter-form-compact" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="subscribe-btn-compact">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
