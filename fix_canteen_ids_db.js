const { MongoClient } = require('mongodb');

async function fixItems() {
    const uri = "mongodb://localhost:27017/campuseats";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('campuseats');
        
        await db.collection('menu_items').updateOne(
            { name: 'Fluffy Pancakes' },
            { $set: { canteenId: '6aa22636e1aea95c18057a96' } }
        );
        console.log('Fixed Pancakes');
        
        await db.collection('menu_items').updateOne(
            { name: 'Double Espresso' },
            { $set: { canteenId: '6aa2377473adb24af2efeb04' } }
        );
        console.log('Fixed Espresso');
        
        await db.collection('menu_items').updateOne(
            { name: 'Butter Croissant' },
            { $set: { canteenId: '6aa2377473adb24af2efeb04' } }
        );
        console.log('Fixed Croissant');

    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
fixItems();
