const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/campuseats";
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('campuseats');
        
        // Delete all canteens named "Test Canteen"
        const result = await db.collection('canteens').deleteMany({ canteenName: 'Test Canteen' });
        console.log(`Deleted ${result.deletedCount} Test Canteens.`);
        
        // Let's also delete all menu items that belong to test canteens just in case, but they have 0 items.

    } finally {
        await client.close();
    }
}
main().catch(console.error);
