const Ebay = require('../src/index');
let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: '-- client secret---',
    body: {
        grant_type: "client_credentials",
        scope: 'https://api.ebay.com/oauth/api_scope'

    }
});

ebay.getMostWatchedItems({}).then((data) => {
    if (data.errorMessage) {
        console.log("Error:" + data.errorMessage);
    }
    console.log(data);
    // JSON format of complete category sub tree.    
});