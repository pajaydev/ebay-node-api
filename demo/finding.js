/* eslint-disable no-console */
'use strict';
const Ebay = require('../src/index');
const { clientId } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
});

ebay.findItemsByCategory(10181).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

// refer here for filtering the items 
// https://developer.ebay.com/devzone/finding/callref/finditemsbykeywords.html#control
ebay.findItemsByKeywords({
    keywords: 'iphone',
    sortOrder: 'PricePlusShippingLowest', //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    Condition: 3000,
    SoldItemsOnly: false,
    affiliate: {
        networkID: 9,
        trackingID: 1234567890
    }
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

//https://developer.ebay.com/devzone/finding/callref/findCompletedItems.html
/* This call searches for items whose listings are completed and are no longer available for
sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
Keyword queries search the title and subtitle of the item; they do not search descriptions. */
ebay.findCompletedItems({
    keywords: 'Garmin nuvi 1300 Automotive GPS Receiver',
    categoryID: '156955',
    sortOrder: 'PricePlusShippingLowest', //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    Condition: 3000,
    SoldItemsOnly: true,
    entriesPerPage: 2
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

// // This call searches for items on eBay using specific eBay product values.
// https://developer.ebay.com/DevZone/finding/CallRef/findItemsByProduct.html#findItemsByProduct
ebay.findItemsByProduct({
    productID: 53039031,
    entriesPerPage: 2
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

// Searches items on eBay by category or keyword or both.
ebay.findItemsAdvanced({
    entriesPerPage: 2,
    keywords: 'ipad',
    ExpeditedShippingType: 'OneDayShipping'
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

ebay.getVersion().then((data) => {
    console.log(data.version);
}, (error) => {
    console.log(error);
});


// Find ebay stores here https://www.ebay.com/sns
// https://developer.ebay.com/devzone/finding/callref/findItemsIneBayStores.html
ebay.findItemsIneBayStores({storeName: 'Battery Gallery'}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});
