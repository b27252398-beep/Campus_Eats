const { execSync } = require('child_process');

const urls = [
    ["vadapav.jpg", "https://upload.wikimedia.org/wikipedia/commons/4/4e/Vada_Pav-Indian_street_food.JPG"],
    ["samosa.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/c8/Samosa_chaat.jpg"],
    ["paneertikka.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/91/Paneer_Tikka.jpg"],
    ["dosa.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_and_ghee.jpg"],
    ["cholebhature.jpg", "https://upload.wikimedia.org/wikipedia/commons/e/ea/Chole_Bhature.jpg"],
    ["biryani.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/5c/Hyderabadi_Chicken_Biryani.jpg"],
    ["gulabjamun.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/c2/Gulab_jamun_%28Indian_sweet%29.jpg"],
    ["mangolassi.jpg", "https://upload.wikimedia.org/wikipedia/commons/1/15/Mango_Lassi.jpg"],
    ["masalachai.jpg", "https://upload.wikimedia.org/wikipedia/commons/e/e0/Masala_Chai.JPG"],
    ["jalebi.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/07/Jalebi_-_a_sweet_from_India.jpg"]
];

function download() {
    for (const [name, url] of urls) {
        console.log(`Downloading ${name}...`);
        try {
            execSync(`curl.exe -H "User-Agent: curl/7.84.0" -s "${url}" -o frontend/public/${name} -k`);
            console.log(`Downloaded ${name}`);
            // wait 5 seconds to avoid rate limiting
            execSync('node -e "setTimeout(() => {}, 5000)"');
        } catch(e) {
            console.error(`Failed ${name}`);
        }
    }
}
download();
