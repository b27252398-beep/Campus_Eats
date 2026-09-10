const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/campuseats";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('campuseats');
        
        const orders = db.collection('orders');
        const result = await orders.deleteMany({});
        console.log(`Deleted ${result.deletedCount} orders.`);

    } finally {
        await client.close();
    }
}
main().catch(console.error);
