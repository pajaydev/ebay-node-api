const EbayToken = require('oauth-ebay');
const { clientId, clientSecret } = require('./credentials');

let ebay = new EbayToken({
    clientID: clientId,
    clientSecret: clientSecret,
    grantType: 'client_credentials'
});
ebay.getAccessToken().then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});