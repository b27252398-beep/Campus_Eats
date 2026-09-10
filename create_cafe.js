const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    try { return await res.json(); } catch(e) { return await res.text(); }
}

async function createCafe() {
    try {
        const ownerEmail = 'cafe@campuseats.com';
        const ownerPass = 'Password@123';
        
        let cafeToken;
        
        const { MongoClient } = require('mongodb');
        const client = new MongoClient("mongodb://localhost:27017/campuseats", { useUnifiedTopology: true });
        await client.connect();
        const db = client.db('campuseats');
        await db.collection('canteens').updateOne({ email: ownerEmail }, { $set: { status: 'APPROVED', active: true, logoUrl: '/coffee_logo.jpg' } });
        await db.collection('canteen_owners').updateOne({ email: ownerEmail }, { $set: { approvalStatus: 'APPROVED' } });
        await client.close();
        console.log('Approved The Coffee House in DB');
        
        // 2. Login
        const auth = await req('/canteen-auth/login', 'POST', { email: ownerEmail, password: ownerPass });
        cafeToken = auth.token;
        console.log('Logged in as Cafe');
        
        // 3. Add items
        try {
            await req('/menu-items', 'POST', {
                name: 'Double Espresso',
                description: 'A rich double shot of dark roast espresso',
                price: 60.00,
                category: 'Beverages',
                vegetarian: true,
                available: true,
                imageUrl: '/espresso.jpg'
            }, cafeToken);
            console.log('Added Espresso');
        } catch(e) { console.log('Espresso exists?'); }
        
        try {
            await req('/menu-items', 'POST', {
                name: 'Butter Croissant',
                description: 'Freshly baked flaky butter croissant',
                price: 80.00,
                category: 'Breakfast',
                vegetarian: true,
                available: true,
                imageUrl: '/croissant.jpg'
            }, cafeToken);
            console.log('Added Croissant');
        } catch(e) { console.log('Croissant exists?'); }

    } catch(e) {
        console.error(e);
    }
}
createCafe();
