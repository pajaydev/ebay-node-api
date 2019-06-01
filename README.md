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
  * [Get Items By Category](#getitemsbycategory)
  * [Get Single Item](#getitem)
  * [Get Item By Legacy Id](#getitembylegacyid)
  * [Get Items By Group Id](#getitemsbygroupid)
  * [Search Items by Keyword](#searchitemsbykeyword)
  * [Search Items with Free Shipping](#searchitemsbyfreeshipping)
  * [Search Items Based on Price and Condition](#searchitemsbyfilter)
  * [Taxonomy Api(getDefaultCategoryTreeId, getCategoryTree, getCategorySubtree, getCategorySuggestions)](#taxonomyapi)
  * [Get Most Watched item, Get Most Similar Items](#merchandisingapi)
  * [Get All Categories, GetUserDetails, GetShippingCost, GetItemStatus](#shoppingapi)
* [Test](#test)
* [Issues](#issues)
* [Contribution](#contribution)
* [LICENSE](#license)



## Installation

```shell
npm install ebay-node-api
```

## Usage:

```javascript
let eBay = require('ebay-node-api')

let ebay = new eBay({
    clientID: '-- Client APP ID ----',
    // options  - optional HTTP request timeout to apply to all requests.
    env: 'SANDBOX' // optional default = 'PRODUCTION'
})
```
Creates a new `Ebay` instance.

### Getting Client ID:

Join eBay developers program.
Register your app here https://go.developer.ebay.com/quick-start-guide.

If you using Sandbox environment, make sure to provide `env` variable in options as mentioned above.

#### Options

- `clientID` - Required(`String`) - Client Id key provided when you register in eBay developers program.
- `limit` - optional(`Number`) - fetch items functionality - Number that limits the number of data you need in response.
- `details` - optional(`Boolean`) - Get User Details functionality - true, if you need details about the user.
- `env` - optional(`String`) - Environment, default value is PRODUCTION.

## Example

## GetAccessToken

```javascript
const Ebay = require('ebay-node-api');

let ebay = new Ebay({
    clientID: '--Client Id----',
    clientSecret: '-- Client Secret --',
    body: {
        grant_type: 'client_credentials',
	//you may need to define the oauth scope
	scope: 'https://api.ebay.com/oauth/api_scope'
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
const Ebay = require('ebay-node-api');

let ebay = new Ebay({
    clientID: '-- Client APP ID ----',
    limit: 6
});
ebay.findItemsByKeywords('iphone').then((data) => {
    console.log(data); // fetches top 6 results in form of JSON.
}, (error) => {
    console.log(error);
});
```

## GetItemsByCategory
```javascript
let ebay = new Ebay({
    clientID: '-- Client APP ID ----',
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
            'legacyItemId': 2628001 // Get Item Details Using a Legacy ID
            'legacyVariationSku': 'V-00031-WHM' // default null
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
        ebay.getItemByItemGroup('151915076499').then((data) => {
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
            keyword: 'drone',
            limit: '3'
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
            keyword: 'drone',
            limit: 3,
            // filter: { maxDeliveryCost: 0 } old object based filter method
		  filter: 'maxDeliveryCost:0' // new string based filter method. Format here: https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html#conditionIds
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
            keyword: 'iphone',
            limit: 3,
            // filter: { price: '[300..800]', priceCurrency: 'USD', conditions: 'NEW' } old object based filter method
		  filter: 'price:[300..800],priceCurrency:USD,conditions{NEW}' // new string based filter method. Format here: https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html#conditionIds
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search#w4-w1-w4-ReturnItemsBasedonPriceandCondition-7.
        })
    });
```

## MerchandisingApi
```javascript

ebay.getMostWatchedItems({
    maxResults: 3, // optional
    categoryId: 267 // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log('Error:' + data.errorMessage);
    }
    console.log(JSON.stringify(data));
});


ebay.getSimilarItems({
    maxResults: 3, // optional
    itemId=280254552262 // optional
}).then((data) => {
    if (data.errorMessage) {
        console.log('Error:' + data.errorMessage);
    }
    console.log(JSON.stringify(data));
    // JSON format of similar items.    
});
```
## TaxonomyApi

```javascript
ebay.getAccessToken()
    .then((data) => {
        ebay.getDefaultCategoryTreeId('EBAY_US').then((data) => {
            console.log(data);
            // for EN_US { categoryTreeId: '0', categoryTreeVersion: '119' }    
        });

        ebay.getCategoryTree(0).then((data) => {
            console.log(data);
            // JSON format of complete category tree.  
        });

        ebay.getCategorySubtree(0, 11450).then((data) => {
            console.log(data);
            // JSON format of complete category sub tree.    
        });

        ebay.getCategorySuggestions(0, 'iphone').then((data) => {
            console.log(data);
            // JSON format of category suggestions.    
        });

        ebay.getItemAspectsForCategory(0, 67726).then((data) => {
            console.log(data);
            // JSON format of complete category sub tree.    
        });
    });
```
## ShoppingApi
```javascript

ebay.getAllCategories('1234').then((data) => {
    console.log(data); //extract data.CategoryArray
}, (error) => {
    console.log(error);
});

// Get User Profile 
//https://developer.ebay.com/devzone/shopping/docs/callref/GetUserProfile.html
ebay.getUserDetails({ userId: 'ajaykumapratha_0', details: true }).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

// Get Item Status
//https://developer.ebay.com/devzone/shopping/docs/callref/GetItemStatus.html
ebay.getItemStatus(['153265274986', '153265274986']).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});

//https://developer.ebay.com/devzone/shopping/docs/callref/GetShippingCosts.html
ebay.getShippingCosts({
    itemId: '153265274986', destCountryCode: 'US',
    destPostalCode: '95128'
}).then((data) => {
    console.log(data);
}, (error) => {
    console.log(error);
});
```

## Test
All test files are present inside test folder. You can run using

```javascript
npm run test
```
## Issues:
If you are facing any issues, you can create the issues [here](https://github.com/ajay2507/ebay-node-api/issues).

## Contribution:
Willing to share your idea or ready to contribute, check [here](https://github.com/ajay2507/ebay-node-api/blob/master/CONTRIBUTING.md)

## License:
MIT.

## Examples:
I have mentioned the examples here
https://github.com/ajay2507/ebay-node-api/tree/master/demo.
