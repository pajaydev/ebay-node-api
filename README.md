# Ebay API Node.js

Ebay API Client for node js.

# Installing

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

### How to get clientId:

Join eBay developers program. 
Register your app here https://go.developer.ebay.com/quick-start-guide.

#### Options

- `clientID` - Required(`String`) - Client Id key provided when you register in eBay developers program.
- `limit` - optional(`Number`) - fetch items functionality - Number that limits the number of data you need in response.
- `details` - optional(`Boolean`) - Get User Details functionality - true, if you need details about the user.


## How do I run the tests?
All test files are present inside test folder. You can run using

```javascript
npm run test
```


## Examples:
I have mentioned the examples here 
https://github.com/ajay2507/ebay-node-api/tree/master/demo.
