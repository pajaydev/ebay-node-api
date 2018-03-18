const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "-- Client APP ID ----",
    limit: 6
});
ebay.findItemsByCategory(10181).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});




