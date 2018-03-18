const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "-- Client App ID ----",
    details: true // To require detailed info or put false
});
ebay.getUserDetails("ajaykumapratha_0").then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});