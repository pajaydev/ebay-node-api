const Ebay = require('../src/index');
//const { clientId, clientSecret } = require('./credentials/index');

let access_token = '';
let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: "PRD-f1a91299c206-f184-45e0-b068-f139",
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope'

    }
});

// Getting access token and calling getItem method.
ebay.getAccessToken()
    .then((data) => {
        ebay.getDealItems('v1|202117468662|0').then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        })
    });
