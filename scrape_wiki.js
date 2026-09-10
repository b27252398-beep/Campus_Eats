const https = require('https');
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const foods = {
    vadapav: 'Vada_pav',
    samosa: 'Samosa',
    paneertikka: 'Paneer_tikka',
    dosa: 'Dosa',
    cholebhature: 'Chole_bhature',
    biryani: 'Biryani',
    gulabjamun: 'Gulab_jamun',
    mangolassi: 'Lassi',
    masalachai: 'Masala_chai',
    jalebi: 'Jalebi'
};

async function fetchWikiImage(food, wikiPath) {
    return new Promise((resolve, reject) => {
        https.get(`https://en.wikipedia.org/wiki/${wikiPath}`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/<img[^>]+src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"]+\.jpg\/[^"]+)"/i);
                if (match) {
                    let imgUrl = 'https:' + match[1];
                    // Clean up URL to get a decent size (replace the end px size with 800px)
                    imgUrl = imgUrl.replace(/\d+px-[^"]+$/, '800px-' + imgUrl.split('/').pop().replace(/^\d+px-/, ''));
                    
                    console.log(`${food}: Found URL ${imgUrl}`);
                    
                    const file = fs.createWriteStream(`frontend/public/${food}.jpg`);
                    https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (imgRes) => {
                        imgRes.pipe(file);
                        file.on('finish', () => { file.close(); resolve(); });
                    }).on('error', reject);
                } else {
                    console.error(`${food}: No image found in HTML`);
                    resolve();
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    for (const [food, path] of Object.entries(foods)) {
        await fetchWikiImage(food, path);
        // sleep 1 second
        await new Promise(r => setTimeout(r, 1000));
    }
}

run();
