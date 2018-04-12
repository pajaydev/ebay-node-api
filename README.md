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
const Ebay = require('../src/index');

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
const Ebay = require('../src/index');

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
