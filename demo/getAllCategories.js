const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "--Enter your Client ID"
});

ebay.getAllCategories().then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
})