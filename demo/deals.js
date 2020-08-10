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

    // get top ten deals in US.
    ebay.getDeals().then((data) => {
        console.log(data);
    });


    // get deals for specific country code and category
    ebay.getDeals({
        limit: 50, // no of deals per request
        countryCode:'ebay-de', 
        eBayCatId: '1234' // deal for specific category id
    }).then((data) => {
        console.log(data);
    });