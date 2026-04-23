import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Apple, Leaf, GlassWater, Package, Sun, Coffee, Wine } from 'lucide-react';
import './Categories.css';

const CategoryCard = ({ id, name, description, image, color }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="category-card animate-up"
      onClick={() => navigate(`/shop?category=${id}`)}
      style={{ '--accent-color': color }}
    >
      <div className="category-image-wrap">
        <img src={image} alt={name} className="category-img" />
      </div>
      <div className="category-content">
        <h3 className="category-name">{name}</h3>
        <p className="category-subtitle">{description}</p>
      </div>
    </div>
  );
};

const Categories = () => {
  const categories = [
    {
      id: 'fruits',
      name: 'Fresh Fruits',
      description: 'Nature\'s candy, picked at peak ripeness.',
      image: '/fruits.png',
      color: '#22c55e'
    },
    {
      id: 'vegetables',
      name: 'Vegetables',
      description: 'Crisp, crunchy, and packed with nutrients.',
      image: '/vegetables.png',
      color: '#16a34a'
    },
    {
      id: 'juices',
      name: 'Juices',
      description: '100% natural, cold-pressed freshness.',
      image: '/juices.png',
      color: '#f59e0b'
    },
    {
      id: 'fruit-packs',
      name: 'Fruit Packs',
      description: 'Curated mixes for your convenience.',
      image: '/fruit-packs.png',
      color: '#8b5cf6'
    },
    {
      id: 'organic',
      name: 'Organic Products',
      description: 'Grown without pesticides or chemicals.',
      image: '/organic-new.png',
      color: '#15803d'
    },
    {
      id: 'seasonal',
      name: 'Seasonal fruits and vegetables',
      description: 'The best of what\'s in season right now.',
      image: '/seasonal-full-mix.png',
      color: '#facc15'
    },
    {
      id: 'coffee',
      name: 'Coffee',
      description: 'Rich Rwandan beans, roasted to perfection.',
      image: '/coffee.png',
      color: '#713f12'
    },
    {
      id: 'juice-bar',
      name: 'Juice Bar',
      description: 'Freshly made blends and smoothies.',
      image: '/juices.png',
      color: '#ef4444'
    },
    {
      id: 'fruit-baskets',
      name: 'Fruit Baskets',
      description: 'Perfect for gifts and family gatherings.',
      image: '/fruit-basket.png',
      color: '#0ea5e9'
    }
  ];

  return (
    <div className="categories-page">
      <div className="categories-hero">
        <div className="hero-blur-1"></div>
        <div className="hero-blur-2"></div>
        <div className="categories-container">
          <header className="categories-header animate-up">
            <h1>Shop by Categories</h1>
            <p>Explore our curated selection of fresh and healthy options.</p>
          </header>

          <div className="categories-grid">
            {categories.map((cat, index) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
