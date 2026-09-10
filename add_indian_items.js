const { MongoClient } = require('mongodb');

async function fixItems() {
    const uri = "mongodb://localhost:27017/campuseats";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('campuseats');
        
        const canteenIdCentral = '6aa22636e1aea95c18057a96';
        const canteenIdCoffee = '6aa2377473adb24af2efeb04';

        // 1. Delete all the duplicate-looking ones I added earlier
        const duplicates = [
            'Vegan Beyond Burger', 'Pepperoni Pizza Slice', 'Mediterranean Salad', 'Caramel Frappe',
            'Chocolate Croissant', 'Macchiato Shot', 'Berry Pancakes', 'Fudge Brownie', 'Alfredo Pasta Bowl'
        ];
        
        await db.collection('menu_items').deleteMany({ name: { $in: duplicates } });
        console.log('Deleted 9 duplicates');

        const newItems = [
            { canteenId: canteenIdCentral, name: 'Spicy Vada Pav', description: 'Famous Mumbai street food with spiced potato filling', price: 30.0, category: 'Snacks', vegetarian: true, available: true, imageUrl: '/vadapav.jpg' },
            { canteenId: canteenIdCentral, name: 'Punjabi Samosa', description: 'Crispy pastry filled with spiced potatoes and peas', price: 40.0, category: 'Snacks', vegetarian: true, available: true, imageUrl: '/samosa.jpg' },
            { canteenId: canteenIdCentral, name: 'Paneer Tikka', description: 'Marinated cottage cheese cubes grilled to perfection', price: 150.0, category: 'Lunch', vegetarian: true, available: true, imageUrl: '/paneertikka.jpg' },
            { canteenId: canteenIdCentral, name: 'Masala Dosa', description: 'Crispy crepe filled with potato masala', price: 120.0, category: 'Breakfast', vegetarian: true, available: true, imageUrl: '/dosa.jpg' },
            { canteenId: canteenIdCentral, name: 'Chole Bhature', description: 'Spicy chickpea curry served with fried bread', price: 160.0, category: 'Lunch', vegetarian: true, available: true, imageUrl: '/cholebhature.jpg' },
            { canteenId: canteenIdCentral, name: 'Hyderabadi Biryani', description: 'Aromatic basmati rice cooked with spices', price: 200.0, category: 'Dinner', vegetarian: false, available: true, imageUrl: '/biryani.jpg' },
            { canteenId: canteenIdCentral, name: 'Gulab Jamun', description: 'Soft milk dumplings soaked in sugar syrup', price: 50.0, category: 'Snacks', vegetarian: true, available: true, imageUrl: '/gulabjamun.jpg' },
            
            // Coffee House gets the drinks and sweets
            { canteenId: canteenIdCoffee, name: 'Mango Lassi', description: 'Sweet and creamy yogurt drink with mango pulp', price: 80.0, category: 'Beverages', vegetarian: true, available: true, imageUrl: '/mangolassi.jpg' },
            { canteenId: canteenIdCoffee, name: 'Masala Chai', description: 'Traditional Indian tea brewed with spices', price: 20.0, category: 'Beverages', vegetarian: true, available: true, imageUrl: '/masalachai.jpg' },
            { canteenId: canteenIdCoffee, name: 'Crispy Jalebi', description: 'Deep fried spiral sweets soaked in saffron syrup', price: 40.0, category: 'Breakfast', vegetarian: true, available: true, imageUrl: '/jalebi.jpg' }
        ];

        newItems.forEach(item => {
            item._class = 'com.campuseats.model.MenuItem';
            item.lastUpdated = new Date();
        });

        await db.collection('menu_items').insertMany(newItems);
        console.log('Added 10 authentic Indian items!');

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
fixItems();
