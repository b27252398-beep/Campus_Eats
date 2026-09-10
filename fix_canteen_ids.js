const API = 'http://localhost:8081/api';

async function fixItems() {
    try {
        const itemsRes = await fetch(API + '/menu-items');
        const items = await itemsRes.json();
        
        for (const item of items) {
            if (item.canteenId === null) {
                let targetCanteenId = '';
                if (item.name === 'Fluffy Pancakes') {
                    targetCanteenId = '6aa22636e1aea95c18057a96'; // Central Canteen
                } else if (item.name === 'Double Espresso' || item.name === 'Butter Croissant') {
                    targetCanteenId = '6aa2377473adb24af2efeb04'; // The Coffee House
                }
                
                if (targetCanteenId) {
                    item.canteenId = targetCanteenId;
                    
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
                    
                    // Actually, updateMenuItem doesn't check token, let's just PUT
                    await fetch(API + '/menu-items/' + item.id, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatePayload)
                    });
                    console.log(`Updated ${item.name} with canteenId ${targetCanteenId}`);
                }
            }
        }
    } catch(e) {
        console.error(e);
    }
}
fixItems();
