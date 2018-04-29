# Ebay API Node.js

Ebay API Client for node js.

The intent is to simplify the request process by handling the tedious logic. It's a thin wrapper around eBay Api.

[![npm version](https://badge.fury.io/js/ebay-node-api.svg)](https://badge.fury.io/js/ebay-node-api)
[![Build Status](https://travis-ci.org/ajay2507/ebay-node-api.svg?branch=master)](https://travis-ci.org/ajay2507/ebay-node-api) 


## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Installation](#installation)
* [Usage](#usage)
* [Examples](#examples)
  * [Getting Access Token](#getaccesstoken)
  * [Fetch Items By Keyword](#fetchitemsbykeyword)
  * [Get All Categories](#getallcategories)
  * [Get Items By Category](#getitemsbycategory)
  * [Get Single Item](#getitem)
  * [Get Item By Legacy Id](#getitembylegacyid)
  * [Get Items By Group Id](#getitemsbygroupid)
  * [Search Items by Keyword](#searchitemsbykeyword)
  * [Search Items with Free Shipping](#searchitemsbyfreeshipping)
  * [Search Items Based on Price and Condition](#searchitemsbyfilter)
* [Test](#test)
* [Issues](#issues)
* [LICENSE](#license)



## Installation

```shell
npm install ebay-node-api
```

## Usage:

```javascript
let eBay = require('ebay-node-api')

let ebay = new eBay({
    clientID: "-- Client APP ID ----", 
    // options  - optional HTTP request timeout to apply to all requests.
})
```
Creates a new `Ebay` instance.

### Getting Client ID:

Join eBay developers program. 
Register your app here https://go.developer.ebay.com/quick-start-guide.

#### Options

- `clientID` - Required(`String`) - Client Id key provided when you register in eBay developers program.
- `limit` - optional(`Number`) - fetch items functionality - Number that limits the number of data you need in response.
- `details` - optional(`Boolean`) - Get User Details functionality - true, if you need details about the user.

## Example

## GetAccessToken

```javascript
const Ebay = require("ebay-node-api");

let ebay = new Ebay({
    clientID: "--Client Id----",
    clientSecret: '-- Client Secret --',
    body: {
        grant_type: "client_credentials"
    }
});
ebay.getAccessToken().then((data) => {
    console.log(data); // data.access_token
}, (error) => {
    console.log(error);
});
```

## FetchItemsByKeyword
```javascript
const Ebay = require("ebay-node-api");

let ebay = new Ebay({
    clientID: "-- Client APP ID ----",
    limit: 6
});
ebay.findItemsByKeywords("iphone").then((data) => {
    console.log(data); // fetches top 6 results in form of JSON.
}, (error) => {
    console.log(error);
});
```

## GetAllCategories
```javascript
const Ebay = require("ebay-node-api");

let ebay = new Ebay({
    clientID: "-- Client App id ----",
    details: "childCategories" //optional parameter
});

ebay.getAllCategories().then((data) => {
    console.log(data); //extract data.CategoryArray
}, (error) => {
    console.log(error);
})
```
## GetItemsByCategory
```javascript
let ebay = new Ebay({
    clientID: "-- Client APP ID ----",
    limit: 6
});
ebay.findItemsByCategory(10181).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});
```

## GetItem
```javascript
// Get access token and pass it to this method
ebay.getAccessToken()
    .then((data) => {
        ebay.getItem('v1|202117468662|0').then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        })
    });
```

## GetItemByLegacyId
```javascript
ebay.getAccessToken()
    .then((data) => {
        ebay.getItemByLegacyId({
            "legacyItemId": 2628001 // Get Item Details Using a Legacy ID
            "legacyVariationSku": "V-00031-WHM" // default null
        }).then((data) => {
            if (!data) console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        });
    });
```


## GetItemsByGroupId
```javascript
ebay.getAccessToken()
    .then((data) => {
        ebay.getItemByItemGroup("151915076499").then((data) => {
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
            console.log(data)
        }, (error) => {
            console.log(error);
        });
    });
```

## SearchItemsByKeyword
```javascript
ebay.getAccessToken()
    .then((data) => {
        ebay.searchItems({
            keyword: "drone",
            limit: "3"
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://developer.ebay.com/api-     docs/buy/browse/resources/item_summary/methods/search#w4-w1-w4-SearchforItemsbyKeyword-0)
        })
    });
```

## SearchItemsByFreeShipping
```javascript
ebay.getAccessToken()
    .then((data) => {
        ebay.searchItems({
            keyword: "drone",
            limit: 3,
            filter: { maxDeliveryCost: 0 }
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search#w4-w1-w4-ReturnItemswithFreeShipping-6.
        })
    });
```

## SearchItemsByFilter
```javascript
ebay.getAccessToken()
    .then((data) => {
        ebay.searchItems({
            keyword: "iphone",
            limit: 3,
            filter: { price: "[300..800]", priceCurrency: "USD", conditions: "NEW" }
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search#w4-w1-w4-ReturnItemsBasedonPriceandCondition-7.
        })
    });
```

## Test
All test files are present inside test folder. You can run using

```javascript
npm run test
```
## Issues:
If you are facing any issues, you can create the issues [here](https://github.com/ajay2507/ebay-node-api/issues).

## License:
MIT.

## Examples:
I have mentioned the examples here 
https://github.com/ajay2507/ebay-node-api/tree/master/demo.
