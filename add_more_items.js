const { MongoClient } = require('mongodb');

async function addItems() {
    const uri = "mongodb://localhost:27017/campuseats";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('campuseats');
        
        const canteenIdCentral = '6aa22636e1aea95c18057a96';
        const canteenIdCoffee = '6aa2377473adb24af2efeb04';

        const newItems = [
            // Central Canteen
            { canteenId: canteenIdCentral, name: 'Spaghetti Bolognese', description: 'Classic Italian pasta with rich meat sauce', price: 120.0, category: 'Dinner', vegetarian: false, available: true, imageUrl: '/spaghetti.jpg' },
            { canteenId: canteenIdCentral, name: 'Chicken Tikka Masala', description: 'Creamy and spicy Indian chicken curry', price: 150.0, category: 'Dinner', vegetarian: false, available: true, imageUrl: '/tikka.jpg' },
            { canteenId: canteenIdCentral, name: 'Fresh Veggie Wrap', description: 'Healthy wrap with fresh vegetables and hummus', price: 80.0, category: 'Lunch', vegetarian: true, available: true, imageUrl: '/veggiewrap.jpg' },
            { canteenId: canteenIdCentral, name: 'Vegan Beyond Burger', description: 'Plant-based burger patty with fresh lettuce', price: 140.0, category: 'Lunch', vegetarian: true, available: true, imageUrl: '/burger.jpg' },
            { canteenId: canteenIdCentral, name: 'Pepperoni Pizza Slice', description: 'Large slice of New York style pepperoni pizza', price: 90.0, category: 'Snacks', vegetarian: false, available: true, imageUrl: '/pizza.jpg' },
            { canteenId: canteenIdCentral, name: 'Mediterranean Salad', description: 'Crisp salad with feta cheese and olives', price: 110.0, category: 'Lunch', vegetarian: true, available: true, imageUrl: '/salad.jpg' },
            { canteenId: canteenIdCentral, name: 'Caramel Frappe', description: 'Iced blended coffee with rich caramel syrup', price: 100.0, category: 'Beverages', vegetarian: true, available: true, imageUrl: '/latte.jpg' },
            
            // The Coffee House
            { canteenId: canteenIdCoffee, name: 'Chocolate Croissant', description: 'Flaky pastry filled with rich dark chocolate', price: 90.0, category: 'Breakfast', vegetarian: true, available: true, imageUrl: '/croissant.jpg' },
            { canteenId: canteenIdCoffee, name: 'Macchiato Shot', description: 'Espresso shot marked with a dollop of foam', price: 70.0, category: 'Beverages', vegetarian: true, available: true, imageUrl: '/espresso.jpg' },
            { canteenId: canteenIdCoffee, name: 'Berry Pancakes', description: 'Stack of pancakes topped with mixed berries', price: 130.0, category: 'Breakfast', vegetarian: true, available: true, imageUrl: '/pancakes.jpg' },
            { canteenId: canteenIdCoffee, name: 'Fudge Brownie', description: 'Dense, gooey chocolate fudge brownie', price: 60.0, category: 'Snacks', vegetarian: true, available: true, imageUrl: '/brownie.jpg' },
            { canteenId: canteenIdCoffee, name: 'Alfredo Pasta Bowl', description: 'Creamy white sauce pasta bowl', price: 110.0, category: 'Dinner', vegetarian: true, available: true, imageUrl: '/spaghetti.jpg' }
        ];

        // add _class for Spring Data MongoDB
        newItems.forEach(item => {
            item._class = 'com.campuseats.model.MenuItem';
            item.lastUpdated = new Date();
        });

        await db.collection('menu_items').insertMany(newItems);
        console.log('Added 12 new items directly to MongoDB!');

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
addItems();
