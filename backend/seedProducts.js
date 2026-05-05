const pool = require('./db');

const allProducts = [
    // --- FRUITS (15+) ---
    { name: 'Organic Bananas', category: 'fruits', price: 2200, unit: 'bunch', image: '/banana.jpg', badge: 'Bestseller', stock: 100 },
    { name: 'Valencia Oranges', category: 'fruits', price: 2000, unit: 'kg', image: '/orange.jpg', badge: 'Seasonal', stock: 100 },
    { name: 'Fresh Pineapple', category: 'fruits', price: 1800, unit: 'pc', image: '/pineapple.png', badge: 'Sweet', stock: 100 },
    { name: 'Fresh Avocado', category: 'fruits', price: 1500, unit: 'pc', image: '/fruits.png', badge: 'New', stock: 100 },
    { name: 'Ripe Mangoes', category: 'fruits', price: 3000, unit: 'kg', image: '/mango.jpg', badge: 'New', stock: 100 },
    { name: 'Red Apples', category: 'fruits', price: 4500, unit: 'kg', image: '/apple.jpg', badge: 'Crispy', stock: 100 },
    { name: 'Green Grapes', category: 'fruits', price: 6000, unit: '500g', image: '/fruits.png', badge: 'Sweet', stock: 100 },
    { name: 'Sweet Papaya', category: 'fruits', price: 2500, unit: 'pc', image: '/fruits.png', badge: null, stock: 100 },
    { name: 'Watermelon', category: 'fruits', price: 5000, unit: 'pc', image: '/fruits.png', badge: 'Huge', stock: 100 },
    { name: 'Passion Fruit', category: 'fruits', price: 3500, unit: 'kg', image: '/fruits.png', badge: 'Organic', stock: 100 },
    { name: 'Tree Tomato', category: 'fruits', price: 2800, unit: 'kg', image: '/fruits.png', badge: null, stock: 100 },
    { name: 'Guava', category: 'fruits', price: 2000, unit: 'kg', image: '/fruits.png', badge: 'Fresh', stock: 100 },
    { name: 'Strawberries', category: 'fruits', price: 8000, unit: 'pack', image: '/fruits.png', badge: 'Premium', stock: 100 },
    { name: 'Lemon', category: 'fruits', price: 1500, unit: 'kg', image: '/fruits.png', badge: null, stock: 100 },
    { name: 'Lime', category: 'fruits', price: 1800, unit: 'kg', image: '/fruits.png', badge: null, stock: 100 },
    { name: 'Pomegranate', category: 'fruits', price: 7000, unit: 'kg', image: '/fruits.png', badge: 'Rare', stock: 100 },
    { name: 'Plums', category: 'fruits', price: 5500, unit: '500g', image: '/fruits.png', badge: null, stock: 100 },

    // --- VEGETABLES (15+) ---
    { name: 'Fresh Lettuce', category: 'vegetables', price: 1200, unit: 'kg', image: '/lettuce.jpg', badge: 'Organic', stock: 100 },
    { name: 'Green Peas', category: 'vegetables', price: 1800, unit: '500g', image: '/peas.jpg', badge: 'New Arrival', stock: 100 },
    { name: 'Potatoes', category: 'vegetables', price: 3200, unit: 'kg', image: '/Potatoes.jpg', badge: null, stock: 100 },
    { name: 'Eggplant', category: 'vegetables', price: 2200, unit: 'kg', image: '/eggplant.png', badge: null, stock: 100 },
    { name: 'Sweet Potatoes', category: 'vegetables', price: 2000, unit: 'kg', image: '/sweet-potatoes.jpg', badge: null, stock: 100 },
    { name: 'Green Cucumber', category: 'vegetables', price: 800, unit: 'pc', image: '/cucumber.jpg', badge: 'Organic', stock: 100 },
    { name: 'Carrots', category: 'vegetables', price: 1500, unit: 'kg', image: '/vegetables.png', badge: 'Crunchy', stock: 100 },
    { name: 'Onions (Red)', category: 'vegetables', price: 2500, unit: 'kg', image: '/vegetables.png', badge: 'Basic', stock: 100 },
    { name: 'Garlic', category: 'vegetables', price: 5000, unit: 'kg', image: '/vegetables.png', badge: null, stock: 100 },
    { name: 'Ginger', category: 'vegetables', price: 3000, unit: 'kg', image: '/vegetables.png', badge: 'Fresh', stock: 100 },
    { name: 'Tomatoes', category: 'vegetables', price: 2000, unit: 'kg', image: '/vegetables.png', badge: 'Juicy', stock: 100 },
    { name: 'Bell Pepper (Green)', category: 'vegetables', price: 3500, unit: 'kg', image: '/pepper.jpg', badge: null, stock: 100 },
    { name: 'Broccoli', category: 'vegetables', price: 4000, unit: 'pc', image: '/vegetables.png', badge: 'Superfood', stock: 100 },
    { name: 'Cauliflower', category: 'vegetables', price: 3800, unit: 'pc', image: '/vegetables.png', badge: null, stock: 100 },
    { name: 'Spinach', category: 'vegetables', price: 1000, unit: 'bunch', image: '/vegetables.png', badge: 'Fresh', stock: 100 },
    { name: 'Zucchini', category: 'vegetables', price: 2500, unit: 'kg', image: '/vegetables.png', badge: null, stock: 100 },
    { name: 'Pumpkin', category: 'vegetables', price: 4000, unit: 'pc', image: '/vegetables.png', badge: null, stock: 100 },

    // --- ORGANIC (15+) ---
    { name: 'Organic Red Pepper', category: 'organic', price: 5000, unit: 'kg', image: '/pepper.jpg', badge: 'Hot Deal', stock: 100 },
    { name: 'Fresh Kale', category: 'organic', price: 1200, unit: 'bunch', image: '/organic-new.png', badge: 'New', stock: 100 },
    { name: 'Fresh Cabbage', category: 'organic', price: 4500, unit: 'kg', image: '/cabbage.jpg', badge: 'Organic', stock: 100 },
    { name: 'Organic Honey', category: 'organic', price: 12000, unit: '500ml', image: '/organic-new.png', badge: 'Pure', stock: 100 },
    { name: 'Wild Mushrooms', category: 'organic', price: 9000, unit: 'kg', image: '/organic-new.png', badge: 'Rare', stock: 100 },
    { name: 'Organic Eggs', category: 'organic', price: 4500, unit: 'dozen', image: '/organic-new.png', badge: 'Fresh', stock: 100 },
    { name: 'Beetroot', category: 'organic', price: 2000, unit: 'kg', image: '/organic-new.png', badge: 'Healthy', stock: 100 },
    { name: 'Radish', category: 'organic', price: 1800, unit: 'bunch', image: '/organic-new.png', badge: null, stock: 100 },
    { name: 'Celery', category: 'organic', price: 3000, unit: 'bunch', image: '/organic-new.png', badge: 'Fresh', stock: 100 },
    { name: 'Leeks', category: 'organic', price: 2200, unit: 'bunch', image: '/organic-new.png', badge: null, stock: 100 },
    { name: 'Fresh Mint', category: 'organic', price: 500, unit: 'bunch', image: '/organic-new.png', badge: 'Fragrant', stock: 100 },
    { name: 'Parsley', category: 'organic', price: 500, unit: 'bunch', image: '/organic-new.png', badge: null, stock: 100 },
    { name: 'Coriander', category: 'organic', price: 500, unit: 'bunch', image: '/organic-new.png', badge: null, stock: 100 },
    { name: 'Organic Garlic', category: 'organic', price: 6000, unit: 'kg', image: '/organic-new.png', badge: 'Strong', stock: 100 },
    { name: 'Organic Turmeric', category: 'organic', price: 8000, unit: 'kg', image: '/organic-new.png', badge: 'Healing', stock: 100 },

    // --- FRUIT PACKS & BASKETS (15+) ---
    { name: 'Mixed Fruit Pack', category: 'fruit-packs', price: 15000, unit: 'pack', image: '/fruit-packs.png', badge: 'Popular', stock: 100 },
    { name: 'Tropical Fruit Basket', category: 'fruit-packs', price: 25000, unit: 'basket', image: '/fruit-basket.png', badge: 'Deal', stock: 100 },
    { name: 'Breakfast Fruit Tray', category: 'fruit-packs', price: 12000, unit: 'tray', image: '/fruit-packs.png', badge: 'New', stock: 100 },
    { name: 'Family Week Pack', category: 'fruit-packs', price: 35000, unit: 'pack', image: '/fruit-packs.png', badge: 'Value', stock: 100 },
    { name: 'Detox Green Pack', category: 'fruit-packs', price: 18000, unit: 'pack', image: '/fruit-packs.png', badge: 'Healthy', stock: 100 },
    { name: 'Citrus Mix Box', category: 'fruit-packs', price: 10000, unit: 'box', image: '/fruit-packs.png', badge: 'Seasonal', stock: 100 },
    { name: 'Berry Lovers Combo', category: 'fruit-packs', price: 22000, unit: 'pack', image: '/fruit-packs.png', badge: 'Premium', stock: 100 },
    { name: 'Office Snack Basket', category: 'fruit-packs', price: 45000, unit: 'basket', image: '/fruit-basket.png', badge: 'Bulk', stock: 100 },
    { name: 'Smoothie Prep Pack', category: 'fruit-packs', price: 15000, unit: 'pack', image: '/fruit-packs.png', badge: 'Convenient', stock: 100 },
    { name: 'Exotic Discovery Box', category: 'fruit-packs', price: 30000, unit: 'box', image: '/fruit-packs.png', badge: 'Rare', stock: 100 },
    { name: 'Sweet & Sour Mix', category: 'fruit-packs', price: 14000, unit: 'pack', image: '/fruit-packs.png', badge: null, stock: 100 },
    { name: 'Kids Healthy Lunchbox', category: 'fruit-packs', price: 8000, unit: 'pack', image: '/fruit-packs.png', badge: 'For Kids', stock: 100 },
    { name: 'Holiday Gift Basket', category: 'fruit-packs', price: 55000, unit: 'basket', image: '/fruit-basket.png', badge: 'Luxury', stock: 100 },
    { name: 'Wedding Fruit Display', category: 'fruit-packs', price: 85000, unit: 'display', image: '/fruit-basket.png', badge: 'Event', stock: 100 },
    { name: 'Mini Fruit Bag', category: 'fruit-packs', price: 5000, unit: 'bag', image: '/fruit-packs.png', badge: 'Quick', stock: 100 },

    // --- JUICES & DRINKS (15+) ---
    { name: 'Cold Pressed Orange', category: 'juices', price: 3500, unit: '500ml', image: '/juices-new.png', badge: 'Fresh', stock: 100 },
    { name: 'Green Detox Juice', category: 'juices', price: 4500, unit: '500ml', image: '/juices-new.png', badge: 'Healthy', stock: 100 },
    { name: 'Apple & Ginger Blast', category: 'juices', price: 4000, unit: '500ml', image: '/juices-new.png', badge: null, stock: 100 },
    { name: 'Pineapple Mint Refresher', category: 'juices', price: 3800, unit: '500ml', image: '/juices-new.png', badge: 'Refreshing', stock: 100 },
    { name: 'Beetroot Energy Kick', category: 'juices', price: 4500, unit: '500ml', image: '/juices-new.png', badge: 'Power', stock: 100 },
    { name: 'Mango Passion Swirl', category: 'juices', price: 5000, unit: '500ml', image: '/juices-new.png', badge: 'Bestseller', stock: 100 },
    { name: 'Watermelon Cooler', category: 'juices', price: 3000, unit: '500ml', image: '/juices-new.png', badge: 'Summer', stock: 100 },
    { name: 'Carrot & Orange Glow', category: 'juices', price: 4000, unit: '500ml', image: '/juices-new.png', badge: null, stock: 100 },
    { name: 'Pure Coconut Water', category: 'juices', price: 2500, unit: '500ml', image: '/juices-new.png', badge: 'Natural', stock: 100 },
    { name: 'Mixed Berry Smoothie', category: 'juices', price: 6000, unit: '500ml', image: '/juices-new.png', badge: 'Creamy', stock: 100 },
    { name: 'Turmeric Ginger Shot', category: 'juices', price: 2000, unit: '100ml', image: '/juices-new.png', badge: 'Immunity', stock: 100 },
    { name: 'Lemonade with Honey', category: 'juices', price: 2500, unit: '500ml', image: '/juices-new.png', badge: 'Classic', stock: 100 },
    { name: 'Hibiscus Iced Tea', category: 'juices', price: 2000, unit: '500ml', image: '/juices-new.png', badge: 'Natural', stock: 100 },
    { name: 'Avocado Smoothie', category: 'juices', price: 5500, unit: '500ml', image: '/juices-new.png', badge: 'Rich', stock: 100 },
    { name: 'Pomegranate Puree', category: 'juices', price: 8000, unit: '500ml', image: '/juices-new.png', badge: 'Premium', stock: 100 },

    // --- SEASONAL (15+) ---
    { name: 'Sun-Ripened Mangoes', category: 'seasonal', price: 3500, unit: 'kg', image: '/seasonal-new.png', badge: 'Limited', stock: 100 },
    { name: 'Festive Fruit Platter', category: 'seasonal', price: 18000, unit: 'pack', image: '/seasonal-new.png', badge: 'Holiday', stock: 100 },
    { name: 'Summer Watermelon', category: 'seasonal', price: 4500, unit: 'pc', image: '/seasonal-new.png', badge: 'Summer', stock: 100 },
    { name: 'Rainy Season Greens', category: 'seasonal', price: 1500, unit: 'bunch', image: '/seasonal-new.png', badge: 'Fresh', stock: 100 },
    { name: 'Winter Root Mix', category: 'seasonal', price: 5000, unit: 'kg', image: '/seasonal-new.png', badge: 'Warm', stock: 100 },
    { name: 'Seasonal Berry Mix', category: 'seasonal', price: 9000, unit: 'pack', image: '/seasonal-new.png', badge: 'Special', stock: 100 },
    { name: 'Harvest Pumpkin', category: 'seasonal', price: 3500, unit: 'pc', image: '/seasonal-new.png', badge: 'Fall', stock: 100 },
    { name: 'Spring Asparagus', category: 'seasonal', price: 4000, unit: 'bunch', image: '/seasonal-new.png', badge: 'Spring', stock: 100 },
    { name: 'Midnight Grapes', category: 'seasonal', price: 7000, unit: 'kg', image: '/seasonal-new.png', badge: 'Rare', stock: 100 },
    { name: 'Seasonal Citrus Box', category: 'seasonal', price: 12000, unit: 'box', image: '/seasonal-new.png', badge: 'Deal', stock: 100 },
    { name: 'Mountain Peaches', category: 'seasonal', price: 6000, unit: 'kg', image: '/seasonal-new.png', badge: 'Sweet', stock: 100 },
    { name: 'Wild Berries', category: 'seasonal', price: 8500, unit: 'pack', image: '/seasonal-new.png', badge: 'Rare', stock: 100 },
    { name: 'Festive Nut Basket', category: 'seasonal', price: 25000, unit: 'basket', image: '/seasonal-new.png', badge: 'Gift', stock: 100 },
    { name: 'Organic Corn', category: 'seasonal', price: 2000, unit: '5 pcs', image: '/seasonal-new.png', badge: 'Fresh', stock: 100 },
    { name: 'Seasonal Flower Tea', category: 'seasonal', price: 15000, unit: 'tin', image: '/seasonal-new.png', badge: 'Luxury', stock: 100 }
  ];

async function seed() {
    try {
        console.log("Checking schema...");
        await pool.query(`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS category VARCHAR(255),
            ADD COLUMN IF NOT EXISTS "categoryLabel" VARCHAR(255),
            ADD COLUMN IF NOT EXISTS unit VARCHAR(50),
            ADD COLUMN IF NOT EXISTS image VARCHAR(255),
            ADD COLUMN IF NOT EXISTS badge VARCHAR(50)
        `);

        console.log("Clearing existing products...");
        await pool.query("TRUNCATE TABLE products CASCADE");
        await pool.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");

        console.log(`Inserting ${allProducts.length} products...`);
        for (const p of allProducts) {
            await pool.query(
                `INSERT INTO products (name, price, stock, category, unit, image, badge) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [p.name, p.price, p.stock, p.category, p.unit, p.image, p.badge]
            );
        }
        
        console.log("Seed complete!");
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        process.exit(0);
    }
}

seed();
