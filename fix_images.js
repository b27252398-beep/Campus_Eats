const API = 'http://localhost:8081/api';
async function req(path, method, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(await res.text());
    try { return await res.json(); } catch(e) { return await res.text(); }
}

async function fixImages() {
    try {
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: 'canteen@campuseats.com', password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        
        const items = await req('/menu-items');
        
        let toggle = true;
        for (const item of items) {
            // update item to use local image
            item.imageUrl = toggle ? '/campus-hero.jpg' : '/2.jpg';
            toggle = !toggle;
            
            await fetch(API + '/menu-items/' + item.id, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${canteenToken}`
                },
                body: JSON.stringify(item)
            });
            console.log('Fixed image for:', item.name);
        }
    } catch(e) {
        console.error(e);
    }
}
fixImages();
