import React, { useState, useEffect } from 'react';
import { Check, Plus, Minus, ShoppingCart, GlassWater, Leaf, Droplets, Sparkles, ChevronRight, Info } from 'lucide-react';
import './JuiceBuilder.css';

const FRUITS = [
  { id: 'mango', name: 'Mango', price: 500, color: '#FFBE0B', image: '/mango.jpg' },
  { id: 'banana', name: 'Banana', price: 400, color: '#FFE15D', image: '/banana.jpg' },
  { id: 'orange', name: 'Orange', price: 600, color: '#FB5607', image: '/orange.jpg' },
  { id: 'pineapple', name: 'Pineapple', price: 700, color: '#FFD60A', image: '/pineapple.png' },
  { id: 'apple', name: 'Apple', price: 500, color: '#FF006E', image: '/lettuce.jpg' }, // Placeholder image
  { id: 'beetroot', name: 'Beetroot', price: 800, color: '#800020', image: '/pepper.jpg' } // Placeholder
];

const SIZES = [
  { id: 'small', name: 'Small', price: 0 },
  { id: 'medium', name: 'Medium', price: 500 },
  { id: 'large', name: 'Large', price: 1000 },
  { id: 'extra-large', name: 'Extra Large', price: 2000 }
];

const SWEETNESS = ['No sugar', 'Low', 'Medium', 'High'];

const EXTRAS = [
  { id: 'ice', name: 'Ice', price: 0 },
  { id: 'milk', name: 'Milk', price: 300 },
  { id: 'honey', name: 'Honey', price: 500 },
  { id: 'ginger', name: 'Ginger', price: 200 }
];

const JuiceBuilder = () => {
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [size, setSize] = useState('small');
  const [sweetness, setSweetness] = useState('Medium');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(2000); // Base price

  useEffect(() => {
    let price = 2000;

    // Add fruits price
    selectedFruits.forEach(f => {
      const fruit = FRUITS.find(item => item.id === f);
      if (fruit) price += fruit.price;
    });

    // Add size price
    const selectedSize = SIZES.find(s => s.id === size);
    if (selectedSize) price += selectedSize.price;

    // Add extras price
    selectedExtras.forEach(e => {
      const extra = EXTRAS.find(item => item.id === e);
      if (extra) price += extra.price;
    });

    setTotalPrice(price);
  }, [selectedFruits, size, selectedExtras]);

  const toggleFruit = (id) => {
    if (selectedFruits.includes(id)) {
      setSelectedFruits(selectedFruits.filter(f => f !== id));
    } else {
      if (selectedFruits.length < 5) {
        setSelectedFruits([...selectedFruits, id]);
      } else {
        alert("You can select up to 5 fruits for your blend!");
      }
    }
  };

  const toggleExtra = (id) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter(e => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const handleOrder = () => {
    if (selectedFruits.length === 0) {
      alert("Please select at least one fruit for your juice.");
      return;
    }
    const order = {
      fruits: selectedFruits,
      size,
      sweetness,
      extras: selectedExtras,
      totalPrice
    };
    console.log("Order Placed:", order);
    alert("Juice added to cart successfully!");
  };

  return (
    <div className="juice-builder-page">
      <h1 className="builder-main-title">Order your custom made juice</h1>
      <div className="builder-container">
        {/* Left Side: Customization */}
        <div className="builder-main">
          {/* 1. Fruit Selection */}
          <section className="builder-section">
            <div className="section-header">
              <div className="section-num">1</div>
              <h3>Select your fruits (Max 5)</h3>
            </div>
            <div className="fruit-grid">
              {FRUITS.map(fruit => (
                <div
                  key={fruit.id}
                  className={`fruit-card ${selectedFruits.includes(fruit.id) ? 'selected' : ''}`}
                  onClick={() => toggleFruit(fruit.id)}
                >
                  <div className="fruit-check">
                    <Check size={14} />
                  </div>
                  <div className="fruit-img-wrap">
                    <img src={fruit.image} alt={fruit.name} />
                  </div>
                  <span className="fruit-name">{fruit.name}</span>
                  <span className="fruit-price">+RWF {fruit.price}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Options Selection */}
          <div className="options-row">
            <section className="builder-section">
              <div className="section-header">
                <div className="section-num">2</div>
                <h3>Choose Size</h3>
              </div>
              <div className="size-grid">
                {SIZES.map(s => (
                  <button
                    key={s.id}
                    className={`size-btn-v2 ${size === s.id ? 'active' : ''}`}
                    onClick={() => setSize(s.id)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="builder-section">
              <div className="section-header">
                <div className="section-num">3</div>
                <h3>Sweetness Level</h3>
              </div>
              <div className="sweet-selector">
                {SWEETNESS.map(level => (
                  <button
                    key={level}
                    className={`sweet-btn ${sweetness === level ? 'active' : ''}`}
                    onClick={() => setSweetness(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 4. Extras */}
          <section className="builder-section">
            <div className="section-header">
              <div className="section-num">4</div>
              <h3>Optional Extras</h3>
            </div>
            <div className="extras-grid">
              {EXTRAS.map(extra => (
                <div
                  key={extra.id}
                  className={`extra-item ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
                  onClick={() => toggleExtra(extra.id)}
                >
                  <div className="extra-check">
                    <div className="check-inner"></div>
                  </div>
                  <span className="extra-name">{extra.name}</span>
                  {extra.price > 0 && <span className="extra-price">+RWF {extra.price}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Order Summary */}
        <aside className="builder-sidebar">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-scroll">
              <div className="summary-item">
                <span className="label">Base Blend</span>
                <span className="value">RWF 2,000</span>
              </div>

              <div className="summary-group">
                <span className="group-label">Selected Fruits</span>
                {selectedFruits.length > 0 ? (
                  <div className="selected-list">
                    {selectedFruits.map(f => {
                      const fruit = FRUITS.find(item => item.id === f);
                      return (
                        <div key={f} className="list-item">
                          <span>{fruit.name}</span>
                          <span>RWF {fruit.price}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="no-selection">No fruits selected</span>
                )}
              </div>

              <div className="summary-item">
                <span className="label">Size: {SIZES.find(s => s.id === size).name}</span>
                <span className="value">
                  {SIZES.find(s => s.id === size).price > 0 ? `+RWF ${SIZES.find(s => s.id === size).price}` : 'Free'}
                </span>
              </div>

              <div className="summary-item">
                <span className="label">Sweetness</span>
                <span className="value">{sweetness}</span>
              </div>

              {selectedExtras.length > 0 && (
                <div className="summary-group">
                  <span className="group-label">Extras</span>
                  <div className="selected-list">
                    {selectedExtras.map(e => {
                      const extra = EXTRAS.find(item => item.id === e);
                      return (
                        <div key={e} className="list-item">
                          <span>{extra.name}</span>
                          <span>{extra.price > 0 ? `RWF ${extra.price}` : 'Free'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="summary-total">
              <div className="total-label">Total Price</div>
              <div className="total-amount">RWF {totalPrice.toLocaleString()}</div>
            </div>

            <button
              className={`order-btn ${selectedFruits.length === 0 ? 'disabled' : ''}`}
              disabled={selectedFruits.length === 0}
              onClick={handleOrder}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <div className="delivery-info">
              <Info size={16} />
              <p>Freshly prepared after order. 30-45 mins delivery.</p>
            </div>
          </div>

          <div className="promo-card">
            <Sparkles size={24} color="#375340" />
            <div className="promo-text">
              <h4>Buy 3, Get 1 Free!</h4>
              <p>Valid on all custom juice blends this weekend.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};


// End of Custom Juice Builder Page
export default JuiceBuilder;

