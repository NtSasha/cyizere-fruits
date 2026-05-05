const pool = require('./db');

const juiceIngredients = [
  // Fruits
  { builder_type: 'juice', category: 'fruit', code: 'mango', name: 'Mango', price: 500, color: '#FFBE0B', image: '/mango.jpg' },
  { builder_type: 'juice', category: 'fruit', code: 'banana', name: 'Banana', price: 400, color: '#FFE15D', image: '/banana.jpg' },
  { builder_type: 'juice', category: 'fruit', code: 'orange', name: 'Orange', price: 600, color: '#FB5607', image: '/orange.jpg' },
  { builder_type: 'juice', category: 'fruit', code: 'pineapple', name: 'Pineapple', price: 700, color: '#FFD60A', image: '/pineapple.png' },
  { builder_type: 'juice', category: 'fruit', code: 'apple', name: 'Apple', price: 500, color: '#FF006E', image: '/apple.jpg' },
  { builder_type: 'juice', category: 'fruit', code: 'beetroot', name: 'Beetroot', price: 800, color: '#800020', image: '/beetroot.jpg' },
  
  // Sizes
  { builder_type: 'juice', category: 'size', code: 'small', name: 'Small', price: 0, color: null, image: null },
  { builder_type: 'juice', category: 'size', code: 'medium', name: 'Medium', price: 500, color: null, image: null },
  { builder_type: 'juice', category: 'size', code: 'large', name: 'Large', price: 1000, color: null, image: null },
  { builder_type: 'juice', category: 'size', code: 'extra-large', name: 'Extra Large', price: 2000, color: null, image: null },
  
  // Sweetness
  { builder_type: 'juice', category: 'sweetness', code: 'No sugar', name: 'No sugar', price: 0, color: null, image: null },
  { builder_type: 'juice', category: 'sweetness', code: 'Low', name: 'Low', price: 0, color: null, image: null },
  { builder_type: 'juice', category: 'sweetness', code: 'Medium', name: 'Medium', price: 0, color: null, image: null },
  { builder_type: 'juice', category: 'sweetness', code: 'High', name: 'High', price: 0, color: null, image: null },
  
  // Extras
  { builder_type: 'juice', category: 'extra', code: 'ice', name: 'Ice', price: 0, color: null, image: null },
  { builder_type: 'juice', category: 'extra', code: 'milk', name: 'Milk', price: 300, color: null, image: null },
  { builder_type: 'juice', category: 'extra', code: 'honey', name: 'Honey', price: 500, color: null, image: null },
  { builder_type: 'juice', category: 'extra', code: 'ginger', name: 'Ginger', price: 200, color: null, image: null }
];

const coffeeIngredients = [
  // Types
  { builder_type: 'coffee', category: 'type', code: 'espresso', name: 'Espresso', price: 0, color: null, image: '/coffee.png' },
  { builder_type: 'coffee', category: 'type', code: 'americano', name: 'Americano', price: 500, color: null, image: '/coffee.png' },
  { builder_type: 'coffee', category: 'type', code: 'latte', name: 'Latte', price: 1000, color: null, image: '/coffee.png' },
  { builder_type: 'coffee', category: 'type', code: 'cappuccino', name: 'Cappuccino', price: 1000, color: null, image: '/coffee.png' },
  { builder_type: 'coffee', category: 'type', code: 'mocha', name: 'Mocha', price: 1200, color: null, image: '/coffee.png' },
  
  // Sizes
  { builder_type: 'coffee', category: 'size', code: 'small', name: 'Small', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'size', code: 'medium', name: 'Medium', price: 500, color: null, image: null },
  { builder_type: 'coffee', category: 'size', code: 'large', name: 'Large', price: 1000, color: null, image: null },
  
  // Strength
  { builder_type: 'coffee', category: 'strength', code: 'Light', name: 'Light', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'strength', code: 'Regular', name: 'Regular', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'strength', code: 'Strong', name: 'Strong', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'strength', code: 'Extra Strong', name: 'Extra Strong', price: 0, color: null, image: null },

  // Milk
  { builder_type: 'coffee', category: 'milk', code: 'none', name: 'No Milk', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'milk', code: 'regular', name: 'Regular Milk', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'milk', code: 'almond', name: 'Almond Milk', price: 500, color: null, image: null },
  { builder_type: 'coffee', category: 'milk', code: 'soy', name: 'Soy Milk', price: 500, color: null, image: null },
  { builder_type: 'coffee', category: 'milk', code: 'oat', name: 'Oat Milk', price: 600, color: null, image: null },

  // Sweetness
  { builder_type: 'coffee', category: 'sweetness', code: 'No sugar', name: 'No sugar', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'sweetness', code: 'Low', name: 'Low', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'sweetness', code: 'Medium', name: 'Medium', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'sweetness', code: 'High', name: 'High', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'sweetness', code: 'Stevia', name: 'Stevia', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'sweetness', code: 'Brown Sugar', name: 'Brown Sugar', price: 0, color: null, image: null },

  // Extras
  { builder_type: 'coffee', category: 'extra', code: 'ice', name: 'Ice', price: 0, color: null, image: null },
  { builder_type: 'coffee', category: 'extra', code: 'cream', name: 'Whipped Cream', price: 300, color: null, image: null },
  { builder_type: 'coffee', category: 'extra', code: 'caramel', name: 'Caramel Syrup', price: 400, color: null, image: null },
  { builder_type: 'coffee', category: 'extra', code: 'vanilla', name: 'Vanilla Syrup', price: 400, color: null, image: null },
  { builder_type: 'coffee', category: 'extra', code: 'chocolate', name: 'Chocolate Syrup', price: 400, color: null, image: null },
  { builder_type: 'coffee', category: 'extra', code: 'cinnamon', name: 'Cinnamon', price: 100, color: null, image: null }
];

async function seed() {
    try {
        console.log("Creating builder_ingredients table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS builder_ingredients (
                id SERIAL PRIMARY KEY,
                builder_type VARCHAR(50) NOT NULL,
                category VARCHAR(50) NOT NULL,
                code VARCHAR(50) NOT NULL,
                name VARCHAR(100) NOT NULL,
                price NUMERIC DEFAULT 0,
                color VARCHAR(20),
                image VARCHAR(255)
            )
        `);

        console.log("Clearing existing data...");
        await pool.query("TRUNCATE TABLE builder_ingredients RESTART IDENTITY");

        const allIngredients = [...juiceIngredients, ...coffeeIngredients];

        console.log("Inserting ingredients...");
        for (const item of allIngredients) {
            await pool.query(
                `INSERT INTO builder_ingredients (builder_type, category, code, name, price, color, image)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [item.builder_type, item.category, item.code, item.name, item.price, item.color, item.image]
            );
        }
        
        console.log("Seed complete!");
    } catch (err) {
        console.error("Error seeding builder items:", err);
    } finally {
        process.exit(0);
    }
}

seed();
