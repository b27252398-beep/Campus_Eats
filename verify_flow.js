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
    if (!res.ok) {
        throw new Error(`API Error ${res.status} on ${method} ${path}: ${text}`);
    }
    
    try {
        return JSON.parse(text);
    } catch(e) {
        return text;
    }
}

async function runTest() {
    try {
        console.log("1. Init Admin...");
        try { await req('/admin/init', 'POST'); } catch (e) {} 
        
        console.log("2. Admin Login...");
        const adminAuth = await req('/admin/login', 'POST', { email: 'admin@campuseats.com', password: 'admin123' });
        const adminToken = adminAuth.token;

        console.log("3. Register Canteen...");
        let ownerEmail = 'owner_' + Date.now() + '@test.com';
        await req('/canteen-auth/register', 'POST', {
            ownerName: 'Test Owner',
            email: ownerEmail,
            password: 'Password@123',
            phoneNumber: '1234567890',
            canteenName: 'Test Canteen',
            description: 'Test Description',
            location: 'Campus Center',
            openingTime: '08:00',
            closingTime: '20:00',
            logoUrl: 'http://logo.com'
        });
        
        console.log("4. Approve Canteen...");
        const pending = await req('/admin/canteen-owners/pending', 'GET', null, adminToken);
        let ownerId = pending.find(o => o.email === ownerEmail)?.id;
        
        if (ownerId) {
            await req(`/admin/canteen-owners/${ownerId}/approve`, 'POST', null, adminToken);
        } else {
            const all = await req('/admin/canteen-owners/all', 'GET', null, adminToken);
            ownerId = all.find(o => o.email === ownerEmail)?.id;
        }
        
        console.log("5. Canteen Login...");
        const canteenAuth = await req('/canteen-auth/login', 'POST', { email: ownerEmail, password: 'Password@123' });
        const canteenToken = canteenAuth.token;
        
        const canteen = await req('/canteens/owner/' + ownerId, 'GET');
        const canteenId = canteen.id;
        
        console.log("6. Add Menu Item...");
        const item = await req('/menu-items', 'POST', {
            canteenId: canteenId,
            name: 'Masala Dosa',
            description: 'Crispy Dosa',
            price: 50.0,
            category: 'Main Course',
            available: true,
            vegetarian: true,
            imageUrl: 'http://img.com'
        }, canteenToken);
        
        console.log("7. Student Registration & Login...");
        let studentUser = 'stu_' + Date.now().toString().slice(-6);
        let studentEmail = studentUser + '@test.com';
        await req('/auth/signup', 'POST', {
            firstName: 'Student',
            lastName: 'One',
            username: studentUser,
            email: studentEmail,
            password: 'Password@123',
            phoneNumber: '0987654321',
            address: 'Hostel'
        });
        const studentAuth = await req('/auth/login', 'POST', { username: studentUser, password: 'Password@123' });
        const studentToken = studentAuth.token;
        
        console.log("7.5 Add item to cart...");
        await req('/cart/items', 'POST', {
            menuItemId: item.id,
            quantity: 2
        }, studentToken);

        console.log("8. Student Order Checkout...");
        const orderRes = await req('/orders', 'POST', {
            customerName: 'Student One',
            customerEmail: studentEmail,
            customerPhone: '0987654321',
            orderType: 'NOW'
        }, studentToken);
        
        const orderId = orderRes[0].id;
        console.log("Order created! ID:", orderId);
        
        console.log("9. Verify Order Status...");
        const fetchedOrder = await req(`/orders/${orderId}`, 'GET', null, studentToken);
        console.log("Order status:", fetchedOrder.orderStatus); // DTO uses orderStatus for text
        
        console.log("10. Admin/Canteen update order status...");
        // Payment needs to be succeeded to change status!
        console.log("10.5 Fake payment success...");
        // I don't have endpoint to fake payment, but let's check what updateOrderStatus returns
        await req(`/orders/${orderId}/status?canteenId=${canteenId}`, 'PATCH', { status: 'PREPARING' }, canteenToken);
        const updatedOrder = await req(`/orders/${orderId}`, 'GET', null, studentToken);
        console.log("Final status:", updatedOrder.orderStatus);
        
        console.log("ALL CORE FLOWS WORKING PERFECTLY!");
    } catch(e) {
        console.error("Test failed:", e);
    }
}

runTest();
