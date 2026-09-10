const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    try { return await res.json(); } catch(e) { return await res.text(); }
}

async function fixCanteenAndOrders() {
    try {
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: 'canteen@campuseats.com', password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        
        // Get canteen
        const canteens = await req('/canteens', 'GET');
        const myCanteen = canteens.find(c => c.canteenName === 'Central Canteen' || canteens.length > 0);
        if (myCanteen) {
            // Update canteen
            myCanteen.logoUrl = '/canteen_logo.jpg';
            await req('/canteens/' + myCanteen.id, 'PUT', myCanteen, canteenToken);
            console.log('Canteen logo updated successfully!');
        }

        // 2. Delete old Masala Dosa orders
        // Note: Java Mongo typically uses string IDs and OrderController has DELETE /api/orders/{id}? Wait, let's check.
        // Actually I'll just clear the Orders collection from mongo directly since we have mongo server.
    } catch(e) {
        console.error(e);
    }
}
fixCanteenAndOrders();
