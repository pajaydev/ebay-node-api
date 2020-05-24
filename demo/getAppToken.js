const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
});

ebay.getApplicationToken()
    .then((data) => {
        console.log(data);
        if (!data.error) {
            ebay.setAppAccessToken(data);
            console.log(`App token: ${ebay.appAccessToken}`);
        }
    });

setTimeout(() => {
    ebay.getApplicationToken()
        .then((data) => {
            console.log(data);
            if (!data.error) {
                ebay.setAppAccessToken(data);
                console.log(`App token: ${ebay.appAccessToken}`);
            }
        });
}, 7200);