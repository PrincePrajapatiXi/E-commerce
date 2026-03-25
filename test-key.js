import fs from 'fs';
import https from 'https';

const chars = {
    c1: ['Z', '2', 'z'],
    c2: ['O', '0', '8'],
    c3: ['H', 'h'],
    c4: ['z', 'r'],
    c5: ['1', 'l', 'I'],
    c6: ['l', '1', 'I']
};

const testKey = async (key) => {
    return new Promise((resolve) => {
        const data = JSON.stringify({ email: 'test@test.com', password: 'test', returnSecureToken: true });
        const req = https.request(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const isInvalid = body.includes('API_KEY_INVALID');
                if (!isInvalid) {
                    fs.writeFileSync('valid-key.txt', key);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
        req.on('error', () => resolve(false));
        req.write(data);
        req.end();
    });
};

async function run() {
    let count = 0;
    for (let c1 of chars.c1) {
        for (let c2 of chars.c2) {
            for (let c3 of chars.c3) {
                for (let c4 of chars.c4) {
                    for (let c5 of chars.c5) {
                        for (let c6 of chars.c6) {
                            const key = `AIzaSyC4f${c1}K8NiIp${c5}cwKSvL_Q${c2}x${c3}8U7${c6}4${c4}qefAo`;
                            count++;
                            const valid = await testKey(key);
                            if (valid) {
                                console.log('Found valid key:', key);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log('Tested', count, 'keys, none valid.');
}
run();
