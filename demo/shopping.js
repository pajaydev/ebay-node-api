'use strict';

const Ebay = require('../src/index');

let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45"
});

// ebay.getAllCategories('1234').then((data) => {
//     console.log(data); //extract data.CategoryArray
// }, (error) => {
//     console.log(error);
// });

// let ebay = new Ebay({
//     clientID: "-- Client App ID ----",
//     details: true // To require detailed info or put false
// });
ebay.getUserDetails({ userId: "ajaykumapratha_0", details: true }).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

ebay.getItemStatus({ userId: "ajaykumapratha_0", details: true }).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

ebay.getShippingCosts({ userId: "ajaykumapratha_0", details: true }).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});