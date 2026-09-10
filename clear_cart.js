const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    try { return await res.json(); } catch(e) { return await res.text(); }
}
async function clearAll() {
    try {
        const userAuth = await req('/auth/login', 'POST', { username: 'krish', password: 'Password@123' });
        const userToken = userAuth.token;
        const cart = await req('/cart', 'GET', null, userToken);
        if (cart && cart.items) {
            for (const item of cart.items) {
                await fetch(API + '/cart/items/' + item.menuItemId, { method: 'DELETE', headers: { 'Authorization': `Bearer ${userToken}` } });
                console.log('Deleted cart item:', item.name);
            }
        }
    } catch(e) {
        console.error(e);
    }
}
clearAll();
