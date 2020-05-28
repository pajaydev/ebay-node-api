const readline = require('readline');
const Ebay = require('../src/index');
const { clientId, clientSecret, redirectUri } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
    body: {
        grant_type: 'authorization_code',
        scope: 'https://api.ebay.com/oauth/api_scope'
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const authURL = ebay.getUserAuthorizationUrl();
console.log(`Please go here for auth code: ${authURL}`);
rl.question("Enter the auth code recieved from the redirect url (should urldecode it first): ", code => {
    rl.close();
    ebay.getUserTokenByCode(code).then(data => {
        console.log('User token by code response:-');
        console.log(data);
        ebay.getUserTokenByRefresh().then(data => {
            console.log('User token by refresh token response:-');
            console.log(data);
        });
    })
});
