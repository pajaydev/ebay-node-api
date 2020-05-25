const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials/index');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
});

// Getting access token and calling getItem method.
ebay.getApplicationToken()
    .then((data) => {
        ebay.setAppAccessToken(data);
        ebay.getItemById('v1|202117468662|0').then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        })
    });

// Reference ebay developer page https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItemByLegacyId#_samples
// Getting access token and calling getItemByLegacyId method.
ebay.getApplicationToken()
    .then((data) => {
        ebay.setAppAccessToken(data);
        ebay.getItemByLegacyId({
            legacyItemID: 2628001 // Get Item Details Using a Legacy ID
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        });
    });

// Get Item Details Using a Legacy ID and SKU  
ebay.getApplicationToken()
    .then((data) => {
        ebay.setAppAccessToken(data);
        ebay.getItemByLegacyId({
            legacyItemID: 110039490209,
            legacyVariationSku: 'V-00031-WHM'
        }).then((data) => {
            console.log(data);
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
        });
    });


// retrieves the details of the individual items in an item group
// reference https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItemsByItemGroup#uri.item_group_id
ebay.getApplicationToken()
    .then((data) => {
        ebay.setAppAccessToken(data);
        ebay.getItemByItemGroup('351825690866').then((data) => {
            // Data is in format of JSON
            // To check the format of Data, Go to this url (https://jsonblob.com/56cbea67-30b8-11e8-953c-5d1886dcf4a0)
            console.log(data)
        }, (error) => {
            console.log(error);
        });
    });
