const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: 'PRD-f1a91299c206-f184-45e0-b068-f139',
    body: {
        grant_type: "client_credentials"
    }
});
ebay.getAccessToken().then((data) => {
    console.log(data.access_token);
}, (error) => {
    console.log(error);
});