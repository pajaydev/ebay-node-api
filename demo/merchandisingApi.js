const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
});


ebay.getMostWatchedItems({
    maxResults: 3, // optional
    categoryID: 267 // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log('Error:' + data.errorMessage);
    }
    console.log(JSON.stringify(data));
});


ebay.getSimilarItems({
    maxResults: 3, // optional
    itemID: '280254552262' // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log('Error:' + data.errorMessage);
    }
    console.log(JSON.stringify(data));
    // JSON format of similar items.    
});