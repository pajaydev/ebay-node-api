const Ebay = require('../src/index');
let access_token = "";
let ebay = new Ebay({
    clientID: "--Client ID ----",
    clientSecret: '-- Client Secret----',
    body: {
        grant_type: "client_credentials",
        scope: 'https://api.ebay.com/oauth/api_scope'

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

