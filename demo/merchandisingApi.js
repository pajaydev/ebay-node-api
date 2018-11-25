const Ebay = require('../src/index');
const ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: '-- client secret---',
    body: {
        grant_type: "client_credentials",
        scope: 'https://api.ebay.com/oauth/api_scope'

    }
});

ebay.getMostWatchedItems({
    maxResults: 3, // optional
    categoryId: 267 // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log("Error:" + data.errorMessage);
    }
    console.log(JSON.stringify(data));
    // JSON format of complete category sub tree.    
});