import React, { useState, useEffect } from 'react';
import { Check, ShoppingCart, Coffee, Info, Sparkles, GlassWater, ThermometerSun, Droplets } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CoffeeBuilder.css';

const COFFEE_TYPES = [
  { id: 'espresso', name: 'Espresso', price: 0, image: '/coffee-cup.png' },
  { id: 'americano', name: 'Americano', price: 500, image: '/coffee-cup.png' },
  { id: 'latte', name: 'Latte', price: 1000, image: '/coffee-cup.png' },
  { id: 'cappuccino', name: 'Cappuccino', price: 1000, image: '/coffee-cup.png' },
  { id: 'mocha', name: 'Mocha', price: 1200, image: '/coffee-cup.png' }
];

const SIZES = [
  { id: 'small', name: 'Small', price: 0 },
  { id: 'medium', name: 'Medium', price: 500 },
  { id: 'large', name: 'Large', price: 1000 }
];

const STRENGTHS = ['Light', 'Regular', 'Strong', 'Extra Strong'];

const MILK_TYPES = [
  { id: 'none', name: 'No Milk', price: 0 },
  { id: 'regular', name: 'Regular Milk', price: 0 },
  { id: 'almond', name: 'Almond Milk', price: 500 },
  { id: 'soy', name: 'Soy Milk', price: 500 },
  { id: 'oat', name: 'Oat Milk', price: 600 }
];

const SWEETNESS = ['No sugar', 'Low', 'Medium', 'High', 'Stevia', 'Brown Sugar'];

const EXTRAS = [
  { id: 'ice', name: 'Ice', price: 0 },
  { id: 'cream', name: 'Whipped Cream', price: 300 },
  { id: 'caramel', name: 'Caramel Syrup', price: 400 },
  { id: 'vanilla', name: 'Vanilla Syrup', price: 400 },
  { id: 'chocolate', name: 'Chocolate Syrup', price: 400 },
  { id: 'cinnamon', name: 'Cinnamon', price: 100 }
];

const CoffeeBuilder = () => {
  const [selectedType, setSelectedType] = useState('espresso');
  const [size, setSize] = useState('small');
  const [strength, setStrength] = useState('Regular');
  const [milk, setMilk] = useState('none');
  const [sweetness, setSweetness] = useState('Medium');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(1500);

  useEffect(() => {
    let price = 1500; // Base price

    const typeObj = COFFEE_TYPES.find(t => t.id === selectedType);
    if (typeObj) price += typeObj.price;

    const sizeObj = SIZES.find(s => s.id === size);
    if (sizeObj) price += sizeObj.price;

    const milkObj = MILK_TYPES.find(m => m.id === milk);
    if (milkObj) price += milkObj.price;

    selectedExtras.forEach(e => {
      const extra = EXTRAS.find(item => item.id === e);
      if (extra) price += extra.price;
    });

    setTotalPrice(price);
  }, [selectedType, size, milk, selectedExtras]);

  const toggleExtra = (id) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter(e => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const { addToCart } = useCart();

  const handleOrder = () => {
    const typeName = COFFEE_TYPES.find(t => t.id === selectedType).name;
    const sizeName = SIZES.find(s => s.id === size).name;
    
    const customCoffee = {
      id: `coffee-${Date.now()}`,
      name: `Custom ${typeName} (${sizeName})`,
      price: totalPrice,
      image: '/coffee-cup.png',
      unit: 'cup',
      details: {
        type: selectedType,
        size,
        strength,
        milk,
        sweetness,
        extras: selectedExtras
      }
    };
    
    addToCart(customCoffee);
    alert("Coffee added to cart successfully!");
  };

  return (
    <div className="coffee-builder-page">
      <h1 className="builder-main-title">Order your custom made coffee</h1>
      
      <div className="builder-container">
        <div className="builder-main">
          {/* 1. Coffee Base Selection */}
          <section className="builder-section">
            <div className="section-header">
              <div className="section-num">1</div>
              <h3>Select Coffee Base</h3>
            </div>
            <div className="coffee-list">
              {COFFEE_TYPES.map(type => (
                <div 
                  key={type.id} 
                  className={`coffee-row ${selectedType === type.id ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="coffee-row-info">
                    <span className="coffee-name">{type.name}</span>
                    {type.price > 0 && <span className="coffee-price-tag">+RWF {type.price}</span>}
                  </div>
                  <div className="coffee-radio">
                    {selectedType === type.id && <div className="radio-dot" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Size and Strength */}
          <div className="options-row">
            <section className="builder-section">
              <div className="section-header">
                <div className="section-num">2</div>
                <h3>Choose Size</h3>
              </div>
              <div className="pill-grid">
                {SIZES.map(s => (
                  <button 
                    key={s.id} 
                    className={`pill-btn ${size === s.id ? 'active' : ''}`}
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
                <h3>Strength</h3>
              </div>
              <div className="pill-grid">
                {STRENGTHS.map(s => (
                  <button 
                    key={s} 
                    className={`pill-btn ${strength === s ? 'active' : ''}`}
                    onClick={() => setStrength(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 4. Milk Type */}
          <section className="builder-section">
            <div className="section-header">
              <div className="section-num">4</div>
              <h3>Milk Type</h3>
            </div>
            <div className="milk-grid">
              {MILK_TYPES.map(m => (
                <button 
                  key={m.id} 
                  className={`milk-btn ${milk === m.id ? 'active' : ''}`}
                  onClick={() => setMilk(m.id)}
                >
                  <span className="milk-name">{m.name}</span>
                  {m.price > 0 && <span className="milk-price">+RWF {m.price}</span>}
                </button>
              ))}
            </div>
          </section>

          {/* 5. Sweetness */}
          <section className="builder-section">
            <div className="section-header">
              <div className="section-num">5</div>
              <h3>Sweetness</h3>
            </div>
            <div className="sweetness-grid">
              {SWEETNESS.map(s => (
                <button 
                  key={s} 
                  className={`sweet-btn-coffee ${sweetness === s ? 'active' : ''}`}
                  onClick={() => setSweetness(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* 6. Extras */}
          <section className="builder-section extras-section">
            <div className="section-header">
              <div className="section-num">6</div>
              <h3 className="section-title-sm">Optional Extras</h3>
            </div>
            <div className="extras-grid-coffee">
              {EXTRAS.map(extra => (
                <div 
                  key={extra.id} 
                  className={`extra-item-coffee ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
                  onClick={() => toggleExtra(extra.id)}
                >
                  <div className="extra-check-coffee">
                    <div className="check-inner-coffee"></div>
                  </div>
                  <span className="extra-name-coffee">{extra.name}</span>
                  {extra.price > 0 && <span className="extra-price-coffee">+RWF {extra.price}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <aside className="builder-sidebar">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-scroll">
              <div className="summary-item">
                <span className="label">Base Coffee</span>
                <span className="value">RWF 1,500</span>
              </div>

              <div className="summary-item">
                <span className="label">Type: {COFFEE_TYPES.find(t => t.id === selectedType).name}</span>
                <span className="value">
                  {COFFEE_TYPES.find(t => t.id === selectedType).price > 0 ? `+RWF ${COFFEE_TYPES.find(t => t.id === selectedType).price}` : 'Included'}
                </span>
              </div>

              <div className="summary-item">
                <span className="label">Size: {SIZES.find(s => s.id === size).name}</span>
                <span className="value">
                  {SIZES.find(s => s.id === size).price > 0 ? `+RWF ${SIZES.find(s => s.id === size).price}` : 'Free'}
                </span>
              </div>

              <div className="summary-item">
                <span className="label">Milk: {MILK_TYPES.find(m => m.id === milk).name}</span>
                <span className="value">
                  {MILK_TYPES.find(m => m.id === milk).price > 0 ? `+RWF ${MILK_TYPES.find(m => m.id === milk).price}` : 'Free'}
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

            <button className="order-btn" onClick={handleOrder}>
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <div className="delivery-info">
              <Info size={14} />
              <p>Brewed fresh. Ready in 10-15 mins.</p>
            </div>
          </div>

          <div className="promo-card-coffee">
            <Sparkles size={24} color="#375340" style={{ marginRight: '1rem' }} />
            <div className="promo-text">
              <h4>Morning Special</h4>
              <p>Free cookie with any large coffee before 10 AM!</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoffeeBuilder;
