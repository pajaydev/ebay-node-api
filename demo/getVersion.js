const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    limit: 6
});
ebay.getVersion().then((data) => {
    console.log(data.version);
}, (error) => {
    console.log(error);
});




