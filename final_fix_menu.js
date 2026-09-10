const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    try { return await res.json(); } catch(e) { return await res.text(); }
}

async function fixMenu() {
    try {
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: 'canteen@campuseats.com', password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        
        const items = await req('/menu-items');
        
        for (const item of items) {
            let needsUpdate = false;
            
            if (item.name === 'Classic Cheeseburger') {
                item.category = 'Lunch';
                item.imageUrl = '/burger.jpg';
                needsUpdate = true;
            } else if (item.name === 'Margherita Pizza') {
                item.category = 'Dinner';
                item.imageUrl = '/pizza.jpg';
                needsUpdate = true;
            } else if (item.name === 'Chicken Caesar Salad') {
                item.category = 'Lunch';
                item.imageUrl = '/salad.jpg';
                needsUpdate = true;
            } else if (item.name === 'Iced Latte') {
                item.category = 'Beverages';
                item.imageUrl = '/latte.jpg';
                needsUpdate = true;
            } else if (item.name === 'Chocolate Brownie') {
                item.category = 'Snacks';
                item.imageUrl = '/brownie.jpg';
                needsUpdate = true;
            }
            
            if (needsUpdate) {
                // To avoid unrecognized field issues when sending the item back, pick only known fields
                const updatePayload = {
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    vegetarian: item.vegetarian,
                    available: item.available,
                    imageUrl: item.imageUrl,
                    canteenId: item.canteenId
                };
                
                await fetch(API + '/menu-items/' + item.id, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${canteenToken}`
                    },
                    body: JSON.stringify(updatePayload)
                });
                console.log('Updated item:', item.name);
            }
        }

        // Check if breakfast item exists
        const breakfastExists = items.some(i => i.name === 'Fluffy Pancakes');
        if (!breakfastExists) {
            await req('/menu-items', 'POST', {
                name: 'Fluffy Pancakes',
                description: 'Stack of pancakes with maple syrup and berries',
                price: 150.00,
                category: 'Breakfast',
                vegetarian: true,
                available: true,
                imageUrl: '/pancakes.jpg'
            }, canteenToken);
            console.log('Added Fluffy Pancakes');
        }

    } catch(e) {
        console.error(e);
    }
}
fixMenu();
