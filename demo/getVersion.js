const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "-- Client APP ID ----",
    limit: 6
});
ebay.getVersion().then((data) => {
    console.log(data.version);
}, (error) => {
    console.log(error);
});




