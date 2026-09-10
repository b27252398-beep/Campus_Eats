const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    const text = await res.text();
    if (!res.ok) throw new Error(text);
    try { return JSON.parse(text); } catch(e) { return text; }
}

async function addItems() {
    try {
        console.log("Logging in as canteen owner...");
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: 'canteen@campuseats.com', password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        
        // Find canteenId for this owner
        // First we need ownerId. We can get it from admin or just parse JWT? No, let's login as admin to get it
        const adminAuth = await req('/admin/login', 'POST', { email: 'admin@campuseats.com', password: 'admin123' });
        const adminToken = adminAuth.token;
        const allOwners = await req('/admin/canteen-owners/all', 'GET', null, adminToken);
        const ownerId = allOwners.find(o => o.email === 'canteen@campuseats.com')?.id;
        
        const canteen = await req('/canteens/owner/' + ownerId, 'GET');
        const canteenId = canteen.id;

        const items = [
            {
                name: 'Classic Cheeseburger',
                description: 'Juicy beef patty with melted cheddar, lettuce, and tomato',
                price: 120.0,
                category: 'Fast Food',
                available: true,
                vegetarian: false,
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
            },
            {
                name: 'Margherita Pizza',
                description: 'Fresh mozzarella, tomato sauce, and basil',
                price: 250.0,
                category: 'Fast Food',
                available: true,
                vegetarian: true,
                imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?auto=format&fit=crop&w=500&q=80'
            },
            {
                name: 'Chicken Caesar Salad',
                description: 'Crisp romaine, grilled chicken, parmesan, and croutons',
                price: 150.0,
                category: 'Healthy',
                available: true,
                vegetarian: false,
                imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80'
            },
            {
                name: 'Iced Latte',
                description: 'Chilled espresso with cold milk and ice',
                price: 80.0,
                category: 'Beverages',
                available: true,
                vegetarian: true,
                imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba1?auto=format&fit=crop&w=500&q=80'
            },
            {
                name: 'Chocolate Brownie',
                description: 'Warm fudge brownie with vanilla ice cream',
                price: 90.0,
                category: 'Desserts',
                available: true,
                vegetarian: true,
                imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80'
            }
        ];

        console.log("Adding items...");
        for (const item of items) {
            item.canteenId = canteenId;
            await req('/menu-items', 'POST', item, canteenToken);
            console.log("Added: " + item.name);
        }
        
        console.log("All items added successfully!");
    } catch (e) {
        console.error(e);
    }
}
addItems();
