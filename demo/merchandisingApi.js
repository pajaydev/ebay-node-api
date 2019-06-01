const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
    body: {
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope'

    }
});


ebay.getMostWatchedItems({
    maxResults: 3, // optional
    categoryId: 267 // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log('Error:' + data.errorMessage);
    }
    console.log(JSON.stringify(data));
});


ebay.getSimilarItems({
    maxResults: 3, // optional
    itemId: '280254552262' // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log('Error:' + data.errorMessage);
    }
    console.log(JSON.stringify(data));
    // JSON format of similar items.    
});