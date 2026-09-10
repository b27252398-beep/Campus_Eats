const fs = require('fs');
const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const images = {
    vadapav: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Vada_Pav-Indian_street_food.JPG',
    samosa: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Samosa_chaat.jpg',
    paneertikka: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Paneer_Tikka.jpg',
    dosa: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_and_ghee.jpg',
    cholebhature: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Chole_Bhature.jpg',
    biryani: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Hyderabadi_Chicken_Biryani.jpg',
    gulabjamun: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Gulab_jamun_%28Indian_sweet%29.jpg',
    mangolassi: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Mango_Lassi.jpg',
    masalachai: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Masala_Chai.JPG',
    jalebi: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Jalebi_-_a_sweet_from_India.jpg'
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function download(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        const req = https.get(url, { 
            headers: { 
                'User-Agent': 'CampusFoodBot/1.0 (krish.limbachiya@example.com) Node.js/24',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive'
            } 
        }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return download(response.headers.location, filename).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filename, () => {});
            reject(err);
        });
        
        req.end();
    });
}

async function run() {
    for (const [name, url] of Object.entries(images)) {
        try {
            console.log(`Downloading ${name}...`);
            await download(url, `frontend/public/${name}.jpg`);
            console.log(`Success: ${name}`);
        } catch (e) {
            console.error(`Failed ${name}:`, e.message);
        }
        await delay(3000); // Wait 3 seconds to avoid 429
    }
}
run();
