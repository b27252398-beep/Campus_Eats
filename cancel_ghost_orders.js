const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    try { return await res.json(); } catch(e) { return await res.text(); }
}

async function cancelGhostOrders() {
    try {
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: 'canteen@campuseats.com', password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        
        const userAuth = await req('/auth/login', 'POST', { username: 'krish', password: 'Password@123' });
        const userToken = userAuth.token;
        
        const orders = await req('/orders', 'GET', null, userToken);
        for (const order of orders) {
            const hasGhostItem = order.orderItems.some(item => item.name === 'Masala Dosa' || item.imageUrl === 'http://img.com');
            if (hasGhostItem) {
                // PATCH /orders/{id}/status?status=CANCELLED
                await fetch(API + '/orders/' + order.id + '/status?status=CANCELLED', {
                    method: 'PATCH',
                    headers: { 'Authorization': `Bearer ${canteenToken}` }
                });
                console.log('Cancelled ghost order:', order.id);
            }
        }
    } catch(e) {
        console.error(e);
    }
}
cancelGhostOrders();
