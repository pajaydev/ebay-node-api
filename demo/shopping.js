'use strict';

const Ebay = require('../src/index');
const { clientId } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
});

ebay.getAllCategories('1234').then((data) => {
    console.log(data); //extract data.CategoryArray
}, (error) => {
    console.log(error);
});


// // Get User Profile 
// // https://developer.ebay.com/devzone/shopping/docs/callref/GetUserProfile.html
ebay.getUserDetails({ userID: 'ajaykumapratha_0', includeSelector: 'Details' }).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});


// Get Item Status
// https://developer.ebay.com/devzone/shopping/docs/callref/GetItemStatus.html
ebay.getItemStatus(['153265274986', '153265274986']).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

// https://developer.ebay.com/devzone/shopping/docs/callref/GetShippingCosts.html
ebay.getShippingCosts({
    itemId: '153265274986', destinationCountryCode: 'US',
    destinationPostalCode: '95128'
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

//https://developer.ebay.com/devzone/shopping/docs/callref/getsingleitem.html
ebay.getSingleItem('153265274986').then((data) => {
    console.log(data);
});

ebay.getMultipleItems({ itemID: ['153265274986', '153265274986'] }).then((data) => {
    console.log(data);
});