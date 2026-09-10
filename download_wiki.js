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

async function download(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
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
    });
}

async function run() {
    for (const [name, url] of Object.entries(images)) {
        try {
            await download(url, `frontend/public/${name}.jpg`);
            console.log(`Downloaded ${name}.jpg`);
        } catch (e) {
            console.error(`Failed ${name}:`, e.message);
        }
    }
}
run();
