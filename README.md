# Ebay API Node.js

Ebay API Client for node js.

The intent is to simplify the request process by handling the tedious logic. It's a thin wrapper around eBay Api.

[![npm version](https://badge.fury.io/js/ebay-node-api.svg)](https://badge.fury.io/js/ebay-node-api)
[![Downloads](https://img.shields.io/npm/dt/ebay-node-api.svg)](https://img.shields.io/npm/dt/ebay-node-api.svg)
[![Build Status](https://travis-ci.org/pajaydev/ebay-node-api.svg?branch=master)](https://travis-ci.org/ajay2507/ebay-node-api)

**Documentation:** [https://pajaydev.github.io/ebay-node-api](https://pajaydev.github.io/ebay-node-api)

## 📒 Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Examples](#examples)
* [Starter Guide](#starter-guide)
* [Test](#test)
* [Issues](#issues)
* [Contribution](#contribution)
* [LICENSE](#license)


## 🚚 Installation

```shell
npm install ebay-node-api
```

## ⚡️ Usage:

```javascript
let eBay = require('ebay-node-api')

let ebay = new eBay({
    clientID: '-- Client APP ID ----',
    env: 'SANDBOX', // optional default = 'PRODUCTION'
    headers:{ // optional
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB' // For Great Britain https://www.ebay.co.uk
    }
})
```

## Starter Guide

Check out the [Starter Guide](https://pajaydev.github.io/ebay-node-api) documentation with examples to get started.

## Examples

```javascript
// findItemsBykeyword
ebay.findItemsByKeywords({
    keywords: 'Garmin nuvi 1300 Automotive GPS Receiver',
    sortOrder: 'PricePlusShippingLowest', //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
    pageNumber: 2,
    limit: 10
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

// Get Single item listing on eBay
ebay.getSingleItem('153265274986').then((data) => {
    console.log(data);
});

// Search Items by Keyword
ebay.getAccessToken()
    .then((data) => {
        ebay.searchItems({
            keyword: 'drone',
            limit: '3'
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://developer.ebay.com/api-     docs/buy/browse/resources/item_summary/methods/search#w4-w1-w4-SearchforItemsbyKeyword-0)
        })
    });

// perform Advance Search Items by Keyword or category or both
// Search Buy It Now ipad items with one day shipping. (https://developer.ebay.com/DevZone/finding/CallRef/findItemsAdvanced.html)
ebay.findItemsAdvanced({
    entriesPerPage: 2,
    keywords: 'ipad',
    ExpeditedShippingType: 'OneDayShipping',
    ListingType: 'AuctionWithBIN'
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});
```

[More Examples](https://pajaydev.github.io/ebay-node-api)

## Test
All test files are present inside test folder. You can run using

```javascript
npm run test
```
## Issues:
If you are facing any issues or missing something, you can create the issues [here](https://github.com/pajaydev/ebay-node-api/issues).

## 👍 Contribution:
Show your ❤️ and support by giving a ⭐. Willing to share your idea or ready to contribute, check [here](https://github.com/pajaydev/ebay-node-api/blob/master/CONTRIBUTING.md)

## 📝 License:
MIT.

## Examples:
I have provided the examples here
https://github.com/pajaydev/ebay-node-api/tree/master/demo.
