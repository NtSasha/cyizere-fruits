import React, { useEffect } from 'react';
import { ArrowRight, ShoppingCart, Apple, Grape, Carrot, ShieldCheck, Truck, Clock, Droplet, Package, Leaf, Search, ChevronDown, LayoutGrid, List, GlassWater, Tag, Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
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
              { name: 'Fruit Packs', image: '/fruit-packs.png', scale: '1.2' },
              { name: 'Organic Products', image: '/organic-new.png', scale: '1.3', objectPosition: 'center 40%' },
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
              <div className="sub-image-decoration"></div>
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

      {/* 8. Get in Touch Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-layout">
            {/* Left Side: Information */}
            <div className="contact-info">
              <h2 className="contact-title centered">Get in Touch</h2>
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
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Your Email" required />
                </div>
                
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="How can we help you?" required rows="5"></textarea>
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
