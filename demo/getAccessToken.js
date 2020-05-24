const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope'

    }
});

//console.log(ebay.getAccessToken());

// // //Search for Items by Keyword.
ebay.getAccessToken()
    .then((data) => {
        console.log("generate tokensss");
        console.log(data);
    });

console.log("++++++++++++++++++++");

ebay.getAccessToken()
    .then((data) => {
        console.log("generate tokensss");
        console.log(data);
    });


setTimeout(() => {
    ebay.getAccessToken()
        .then((data) => {
            console.log("generate tokensss");
            console.log(data);
        });
}, 7200);