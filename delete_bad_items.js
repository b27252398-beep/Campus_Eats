const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
async function cleanup() {
    try {
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: 'canteen@campuseats.com', password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        const items = await req('/menu-items');
        for (const item of items) {
            if (item.name === 'Masala Dosa' || item.imageUrl === 'http://img.com') {
                await fetch(API + '/menu-items/' + item.id, { method: 'DELETE', headers: { 'Authorization': `Bearer ${canteenToken}` } });
                console.log('Deleted bad item:', item.name);
            }
        }
    } catch(e) {
        console.error(e);
    }
}
cleanup();
