import React, { useEffect, useState } from 'react';
import { ArrowRight, ShoppingCart, Apple, Grape, Carrot, ShieldCheck, Truck, Clock, Droplet, Package, Leaf, Search, ChevronDown, LayoutGrid, List, GlassWater, Tag, Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Home.css';

import { getApiUrl } from '../utils/api';

const Home = () => {
  const { hash } = useLocation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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

  // Fetch products from backend for the featured section
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(getApiUrl('/products'));
        if (res.ok) {
          const data = await res.json();
          
          // The specific list of products requested by the user
          const targetNames = [
            'Potatoes', 
            'Carrots', 
            'Organic Red Pepper', 
            'Green Cucumber', 
            'Red Apples', 
            'Valencia Oranges', 
            'Ripe Mangoes', 
            'Eggplant'
          ];

          // Find these specific products in our database
          const featured = targetNames.map(name => 
            data.find(p => p.name === name)
          ).filter(p => p !== undefined);

          // If for some reason we can't find some, pad with original items
          if (featured.length < 8) {
            const others = data.filter(p => !featured.find(f => f.id === p.id)).slice(0, 8 - featured.length);
            setFeaturedProducts([...featured, ...others]);
          } else {
            setFeaturedProducts(featured);
          }
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero">
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
              { name: 'Fruit Packs', image: '/fruit-packs.png', scale: '1.2' },
              { name: 'Organic Products', image: '/pepper.jpg', scale: '1.2', objectPosition: 'center' },
              { name: 'Seasonal fruits and vegetables', image: '/seasonal-full-mix.png', scale: '1.2' },
              { name: 'Coffee', image: '/coffee.png', scale: '1' },
              { name: 'Juice Bar', image: '/juices.png', scale: '0.85' },
              { name: 'Fruit Baskets', image: '/fruit-basket.png', scale: '1.1' },
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

      {/* 2.5 About Us Section */}
      <section className="about-us-section" id="about">
        <div className="about-container">
          <div className="section-label">Our Story</div>
          <div className="about-layout">
            <div className="about-image-side">
              <div className="main-image-wrap">
                <img src="/dark-groceries.png" alt="Fresh Organic Produce" />
              </div>
            </div>

            <div className="about-text-side">
              <h2 className="about-title">About Cyizere Fruits</h2>
              <p className="about-intro">
                At Cyizere Fruits, we believe that nature provides the best ingredients for a healthy life. 
                What started as a small farm-to-table initiative has grown into Rwanda's most trusted 
                source for fresh, organic produce and premium beverages.
              </p>
              
              <div className="mission-box">
                <h4>Our Mission</h4>
                <p>To empower healthy living by providing affordable, high-quality organic products directly from our fields to your table, ensuring freshness in every bite.</p>
              </div>

              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="h-icon"><Leaf size={20} /></div>
                  <div className="h-content">
                    <h5>Fresh & Organic</h5>
                    <p>100% certified organic produce</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="h-icon"><Truck size={20} /></div>
                  <div className="h-content">
                    <h5>Reliable Delivery</h5>
                    <p>Fast delivery within 2 hours</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="h-icon"><GlassWater size={20} /></div>
                  <div className="h-content">
                    <h5>Custom Bar</h5>
                    <p>Personalized juice & coffee mixes</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="h-icon"><Tag size={20} /></div>
                  <div className="h-content">
                    <h5>Best Prices</h5>
                    <p>Premium quality at fair rates</p>
                  </div>
                </div>
              </div>

              <button className="about-learn-more">
                Learn more about us <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Produce with Carousel */}
      <section className="featured-produce-section" id="products">
        <div className="featured-header">
          <h2 className="featured-title">Featured products</h2>
        </div>


        <div className="product-grid-container">
          <div className="product-grid">
            {loading ? (
              <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>Loading featured products...</p>
            ) : featuredProducts.map(product => (
              <div
                className="featured-product-card"
                key={product.id}
                onClick={(e) => {
                  e.currentTarget.classList.add('clicked-anim');
                  setTimeout(() => e.currentTarget.classList.remove('clicked-anim'), 400);
                }}
              >
                <div className="fp-img-wrap">
                  {product.badge && (
                    <span className={`fp-badge ${product.badge.toLowerCase() === 'new' ? 'badge-new' : product.badge.toLowerCase() === 'organic' ? 'badge-organic' : 'badge-deal'}`}>
                      {product.badge}
                    </span>
                  )}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="fp-info">
                  <h3 className="fp-title">{product.name}</h3>
                  <span className="fp-unit">{product.unit}</span>
                  <div className="fp-footer">
                    <div className="fp-price-wrap">
                      <span className="fp-price">RWF {Number(product.price).toLocaleString()}</span>
                    </div>
                    <button className="fp-cart-btn" onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}>
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

      {/* 8. Get in Touch Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-layout">
            {/* Left Side: Information */}
            <div className="contact-info">
              <h2 className="contact-title centered">Get in touch</h2>
              <p className="contact-welcome">
                Have questions about our fresh produce or need help with an order? 
                Our team is here to help you experience the best of nature's bounty.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="detail-text">
                    <h4>Phone Number</h4>
                    <p>+250 788 000 000</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Mail size={20} />
                  </div>
                  <div className="detail-text">
                    <h4>Email Address</h4>
                    <p>info@cyizerefruits.com</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="detail-text">
                    <h4>Location</h4>
                    <p>Kigali, Rwanda | KN 56 St, Nyarugenge</p>
                  </div>
                </div>
              </div>

              <div className="response-note">
                <Clock size={16} />
                <span>We usually respond within 24 hours</span>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                const btn = e.target.querySelector('.send-msg-btn');
                const successMsg = e.target.querySelector('.form-success');
                
                btn.classList.add('loading');
                btn.disabled = true;
                
                setTimeout(() => {
                  btn.classList.remove('loading');
                  successMsg.classList.add('show');
                  e.target.reset();
                  setTimeout(() => {
                    successMsg.classList.remove('show');
                    btn.disabled = false;
                  }, 5000);
                }, 1500);
              }}>
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input type="text" id="contact-name" placeholder="Your Name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input type="email" id="contact-email" placeholder="Your Email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" placeholder="How can we help you?" required rows="5"></textarea>
                </div>

                <button type="submit" className="send-msg-btn">
                  <span>Send Message</span>
                  <Send size={18} />
                </button>

                <div className="form-success">
                  <CheckCircle size={18} />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
