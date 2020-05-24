const readline = require('readline');
const Ebay = require('../src/index');
const { clientId, clientSecret, redirectUri } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const authURL = ebay.getUserAuthorizationUrl();
console.log(`Please go here for auth code: ${authURL}`);
rl.question("Enter the auth code recieved from the redirect url: ", code => {
    rl.close();
    ebay.getAccessTokenByCode(code).then(data => {
        console.log(data);
        if (!data.error) {
            ebay.setUserAccessToken(data);
            console.log(`User token: ${ebay.userAccessToken}\nRefresh token: ${ebay.refreshToken}`);
        }
    })
});
