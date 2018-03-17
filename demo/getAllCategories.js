const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45"
});

ebay.getAllCategories().then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
})