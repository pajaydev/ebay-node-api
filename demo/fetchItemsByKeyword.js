const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    limit: 20
});
ebay.findItemsByKeywords("iphone");




