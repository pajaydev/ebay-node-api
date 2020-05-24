const readline = require('readline');

module.exports = {
    getCodeInput: query => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise(resolve => rl.prompt(query, ans => {
            rl.close();
            resolve(ans);
        }));
    }
}