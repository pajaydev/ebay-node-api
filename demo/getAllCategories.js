const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "-- Client App id ----",
    details: "childCategories" //optional parameter
});

ebay.getAllCategories().then((data) => {
    console.log(data); //data.CategoryArray
}, (error) => {
    console.log(error);
})