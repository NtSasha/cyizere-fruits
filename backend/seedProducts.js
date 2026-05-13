const pool = require('./db');

const allProducts = [
    // --- FRUITS ---
    { name: 'Organic Bananas', category: 'fruits', price: 2200, unit: 'bunch', image: '/banana.jpg', badge: 'Bestseller', stock: 100 },
    { name: 'Fresh Pineapple', category: 'fruits', price: 1800, unit: 'pc', image: '/pineapple.jpg', badge: 'Sweet', stock: 100 },
    { name: 'Fresh Avocado', category: 'fruits', price: 1500, unit: 'pc', image: '/avocado.jpg', badge: 'New', stock: 100 },
    { name: 'Ripe Mangoes', category: 'fruits', price: 3000, unit: 'kg', image: '/mango.jpg', badge: 'New', stock: 100 },
    { name: 'Red Apples', category: 'fruits', price: 4500, unit: 'kg', image: '/apple.jpg', badge: 'Crispy', stock: 100 },
    { name: 'Green Grapes', category: 'fruits', price: 6000, unit: '500g', image: '/grapes.jpg', badge: 'Sweet', stock: 100 },
    { name: 'Red Grapes', category: 'fruits', price: 6500, unit: '500g', image: '/red-grapes.jpg', badge: 'Sweet', stock: 100 },
    { name: 'Mandarine', category: 'fruits', price: 3500, unit: 'kg', image: '/mandarine.jpg', badge: 'Easy Peel', stock: 100 },
    { name: 'Sweet Papaya', category: 'fruits', price: 2500, unit: 'pc', image: '/papaya.jpg', badge: null, stock: 100 },
    { name: 'Watermelon', category: 'fruits', price: 5000, unit: 'pc', image: '/watermelon.jpg', badge: 'Huge', stock: 100 },
    { name: 'Passion Fruit', category: 'fruits', price: 3500, unit: 'kg', image: '/passion.jpg', badge: 'Organic', stock: 100 },
    { name: 'Tree Tomato', category: 'fruits', price: 2800, unit: 'kg', image: '/tree-tomato.jpg', badge: null, stock: 100 },
    { name: 'Guava', category: 'fruits', price: 2000, unit: 'kg', image: '/guava.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Strawberries', category: 'fruits', price: 8000, unit: 'pack', image: '/strawberry.jpg', badge: 'Premium', stock: 100 },
    { name: 'Lemon', category: 'fruits', price: 1500, unit: 'kg', image: '/lemon.jpg', badge: null, stock: 100 },
    { name: 'Lime', category: 'fruits', price: 1800, unit: 'kg', image: '/lime.jpg', badge: null, stock: 100 },
    { name: 'Pomegranate', category: 'fruits', price: 7000, unit: 'kg', image: '/pomegranate.jpg', badge: 'Rare', stock: 100 },
    { name: 'Plums', category: 'fruits', price: 5500, unit: '500g', image: '/plums.jpg', badge: null, stock: 100 },
    { name: 'Kiwi', category: 'fruits', price: 4000, unit: 'pack', image: '/kiwi.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Pear', category: 'fruits', price: 3500, unit: 'kg', image: '/pear.jpg', badge: 'Sweet', stock: 100 },
    { name: 'Plantain', category: 'fruits', price: 3000, unit: 'kg', image: '/plantain.jpg', badge: 'New', stock: 100 },
    { name: 'Coconut', category: 'fruits', price: 2500, unit: 'pc', image: '/coconut.jpg', badge: 'Natural', stock: 100 },

    // --- VEGETABLES ---
    { name: 'Fresh Lettuce', category: 'vegetables', price: 1200, unit: 'kg', image: '/lettuce.jpg', badge: 'Organic', stock: 100 },
    { name: 'Green Peas', category: 'vegetables', price: 1800, unit: '500g', image: '/peas.jpg', badge: 'New Arrival', stock: 100 },
    { name: 'Potatoes', category: 'vegetables', price: 3200, unit: 'kg', image: '/Potatoes.jpg', badge: null, stock: 100 },
    { name: 'Eggplant', category: 'vegetables', price: 2200, unit: 'kg', image: '/eggplant.png', badge: null, stock: 100 },
    { name: 'Sweet Potatoes', category: 'vegetables', price: 2000, unit: 'kg', image: '/sweet-potatoes.jpg', badge: null, stock: 100 },
    { name: 'Green Cucumber', category: 'vegetables', price: 800, unit: 'pc', image: '/cucumber.jpg', badge: 'Organic', stock: 100 },
    { name: 'Carrots', category: 'vegetables', price: 1500, unit: 'kg', image: '/carrot.jpg', badge: 'Crunchy', stock: 100 },
    { name: 'Onions (Red)', category: 'vegetables', price: 2500, unit: 'kg', image: '/red-onion.jpg', badge: 'Basic', stock: 100 },
    { name: 'Onion (White)', category: 'vegetables', price: 2800, unit: 'kg', image: '/white-onion.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Garlic', category: 'vegetables', price: 5000, unit: 'kg', image: '/garlic.jpg', badge: null, stock: 100 },
    { name: 'Ginger', category: 'vegetables', price: 3000, unit: 'kg', image: '/ginger.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Tomatoes', category: 'vegetables', price: 2000, unit: 'kg', image: '/tomato.jpg', badge: 'Juicy', stock: 100 },
    { name: 'Bell Pepper (Green)', category: 'vegetables', price: 3500, unit: 'kg', image: '/pepper.jpg', badge: null, stock: 100 },
    { name: 'Orange Bell Pepper', category: 'vegetables', price: 4000, unit: 'kg', image: '/orange-pepper.jpg', badge: 'Sweet', stock: 100 },
    { name: 'Broccoli', category: 'vegetables', price: 4000, unit: 'pc', image: '/broccoli.jpg', badge: 'Superfood', stock: 100 },
    { name: 'Cauliflower', category: 'vegetables', price: 3800, unit: 'pc', image: '/cauliflower.jpg', badge: null, stock: 100 },
    { name: 'Spinach', category: 'vegetables', price: 1000, unit: 'bunch', image: '/spinach.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Zucchini', category: 'vegetables', price: 2500, unit: 'kg', image: '/zucchini.jpg', badge: null, stock: 100 },
    { name: 'Swiss Chard', category: 'vegetables', price: 1500, unit: 'bunch', image: '/chard.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Pumpkin', category: 'vegetables', price: 4000, unit: 'pc', image: '/pumpkin.jpg', badge: null, stock: 100 },
    { name: 'Butternut Squash', category: 'vegetables', price: 3000, unit: 'pc', image: '/butternut.jpg', badge: 'Healthy', stock: 100 },
    { name: 'Yams', category: 'vegetables', price: 3500, unit: 'kg', image: '/yams.jpg', badge: 'Convenient', stock: 100 },
    { name: 'Dodo (Amaranth)', category: 'vegetables', price: 1200, unit: 'bunch', image: '/dodo.jpg', badge: 'Local', stock: 100 },
    { name: 'Green Eggplant', category: 'vegetables', price: 3500, unit: 'kg', image: '/green-eggplant.png', badge: 'Fresh', stock: 100 },

    // --- ORGANIC & HERBS ---
    { name: 'Thyme', category: 'organic', price: 800, unit: 'bunch', image: '/thyme.jpg', badge: 'Aromatic', stock: 100 },
    { name: 'Red Pepper', category: 'organic', price: 5000, unit: 'kg', image: '/red-pepper.jpg', badge: 'Hot Deal', stock: 100 },
    { name: 'Fresh Kale', category: 'organic', price: 1200, unit: 'bunch', image: '/kale.jpg', badge: 'Superfood', stock: 100 },
    { name: 'Fresh Cabbage', category: 'organic', price: 4500, unit: 'kg', image: '/cabbage.jpg', badge: 'Organic', stock: 100 },
    { name: 'Organic Honey', category: 'organic', price: 12000, unit: '500ml', image: '/honey.jpg', badge: 'Pure', stock: 100 },
    { name: 'Wild Mushrooms', category: 'organic', price: 9000, unit: 'kg', image: '/mushroom.jpg', badge: 'Rare', stock: 100 },
    { name: 'Organic Eggs', category: 'organic', price: 4500, unit: 'dozen', image: '/eggs.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Radish', category: 'organic', price: 1800, unit: 'bunch', image: '/radish.jpg', badge: null, stock: 100 },
    { name: 'Celery', category: 'organic', price: 3000, unit: 'bunch', image: '/celery.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Leeks', category: 'organic', price: 2200, unit: 'bunch', image: '/leeks.jpg', badge: null, stock: 100 },
    { name: 'Fresh Mint', category: 'organic', price: 500, unit: 'bunch', image: '/mint.jpg', badge: 'Fragrant', stock: 100 },
    { name: 'Parsley', category: 'organic', price: 500, unit: 'bunch', image: '/parsley.jpg', badge: null, stock: 100 },
    { name: 'Coriander', category: 'organic', price: 500, unit: 'bunch', image: '/coriander.jpg', badge: null, stock: 100 },
    { name: 'Chilli', category: 'organic', price: 800, unit: 'pack', image: '/chilli.jpg', badge: 'Spicy', stock: 100 },
    { name: 'Okra', category: 'organic', price: 4000, unit: 'kg', image: '/okra.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Organic Turmeric', category: 'organic', price: 8000, unit: 'kg', image: '/turmeric.jpg', badge: 'Healing', stock: 100 },

    // --- FRUIT PACKS & BASKETS ---
    { name: 'Mixed Fruit Pack', category: 'fruit-packs', price: 15000, unit: 'pack', image: '/fruit-pack.jpg', badge: 'Popular', stock: 100 },
    { name: 'Tropical Fruit Basket', category: 'fruit-packs', price: 25000, unit: 'basket', image: '/tropical-basket.jpg', badge: 'Deal', stock: 100 },
   

    // --- JUICES & DRINKS ---
    { name: 'Orange juice', category: 'juices', price: 3500, unit: '500ml', image: '/orange-juice.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Green Detox Juice', category: 'juices', price: 4500, unit: '500ml', image: '/detox-juice.jpg', badge: 'Healthy', stock: 100 },
    { name: 'Apple juice', category: 'juices', price: 4000, unit: '500ml', image: '/apple-juice.jpg', badge: null, stock: 100 },
    { name: 'Pineapple juice', category: 'juices', price: 3800, unit: '500ml', image: '/pineapple-juice.jpg', badge: 'Refreshing', stock: 100 },
    { name: 'Beetroot juice', category: 'juices', price: 4500, unit: '500ml', image: '/beetroot-juice.jpg', badge: 'Power', stock: 100 },
    { name: 'Mango juice', category: 'juices', price: 5000, unit: '500ml', image: '/mango-juice.jpg', badge: 'Bestseller', stock: 100 },
    { name: 'Lemonade with Honey', category: 'juices', price: 2500, unit: '500ml', image: '/lemonade.jpg', badge: 'Classic', stock: 100 },
    

    // --- SEASONAL ---

    { name: 'Greens', category: 'seasonal', price: 1500, unit: 'bunch', image: '/greens.jpg', badge: 'Fresh', stock: 100 },
    { name: 'Spring Asparagus', category: 'seasonal', price: 4000, unit: 'bunch', image: '/asparagus.jpg', badge: 'Spring', stock: 100 },
    { name: 'Mountain Peaches', category: 'seasonal', price: 6000, unit: 'kg', image: '/peaches.jpg', badge: 'Sweet', stock: 100 },
    { name: 'Wild Berries', category: 'seasonal', price: 8500, unit: 'pack', image: '/berries.jpg', badge: 'Rare', stock: 100 },
    { name: 'Organic Sweet Corn', category: 'seasonal', price: 2000, unit: '5 pcs', image: '/corn.jpg', badge: 'Fresh', stock: 100 }
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

        console.log(`Inserting ${allProducts.length} categorized products with matching images...`);
        for (const p of allProducts) {
            await pool.query(
                `INSERT INTO products (name, price, stock, category, unit, image, badge) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [p.name, p.price, p.stock, p.category, p.unit, p.image, p.badge]
            );
        }
        
        console.log("Seed complete! Products are now correctly categorized and linked to existing public assets.");
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        process.exit(0);
    }
}

seed();
