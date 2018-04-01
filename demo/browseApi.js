const Ebay = require('../src/index');
let access_token = "";
let ebay = new Ebay({
    clientID: "---Client Id------",
    clientSecret: '-- Client Secret----',
    body: {
        grant_type: "client_credentials",
        scope: 'PRD-f1a91299c206-f184-45e0-b068-f139'

    }
});

// Getting access token and calling getItem method.
ebay.getAccessToken()
    .then((data) => {
        ebay.getItem('v1|202117468662|0').then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        })
    });


// Reference ebay developer page https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItemByLegacyId#_samples
// Getting access token and calling getItemByLegacyId method.
ebay.getAccessToken()
    .then((data) => {
        ebay.getItemByLegacyId({
            "legacyItemId": 2628001 // Get Item Details Using a Legacy ID
        }).then((data) => {
            if (!data) console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        });
    });

//Get Item Details Using a Legacy ID and SKU  
ebay.getAccessToken()
    .then((data) => {
        ebay.getItemByLegacyId({
            "legacyItemId": 2628001,
            "legacyVariationSku": "V-00031-WHM"
        }).then((data) => {
            if (!data) console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        });
    });


//retrieves the details of the individual items in an item group
// reference https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItemsByItemGroup#uri.item_group_id
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


