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

async function createCanteen() {
    try {
        const adminAuth = await req('/admin/login', 'POST', { email: 'admin@campuseats.com', password: 'admin123' });
        const adminToken = adminAuth.token;
        
        await req('/canteen-auth/register', 'POST', {
            ownerName: 'Main Canteen',
            email: 'canteen@campuseats.com',
            password: 'Password@123',
            phoneNumber: '1234567890',
            canteenName: 'Central Canteen',
            description: 'The best food on campus',
            location: 'Main Building',
            openingTime: '08:00',
            closingTime: '20:00',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80'
        }).catch(e => console.log('Register error:', e.message));
        
        const allOwners = await req('/admin/canteen-owners/all', 'GET', null, adminToken);
        const ownerId = allOwners.find(o => o.email === 'canteen@campuseats.com')?.id;
        
        if (ownerId) {
            await req('/admin/canteen-owners/' + ownerId + '/approve', 'POST', null, adminToken);
            console.log('Canteen approved successfully!');
        }
    } catch(e) {
        console.error(e);
    }
}
createCanteen();
