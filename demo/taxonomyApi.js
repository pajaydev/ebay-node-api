const Ebay = require('../src/index');
let access_token = "";
let ebay = new Ebay({
    clientID: "Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45",
    clientSecret: 'PRD-f1a91299c206-f184-45e0-b068-f139',
    body: {
        grant_type: "client_credentials",
        scope: 'https://api.ebay.com/oauth/api_scope'

    }
});

// reference https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getDefaultCategoryTreeId
ebay.getAccessToken()
    .then((data) => {
        ebay.getDefaultCategoryTreeId("EN_US").then((data) => {
            console.log(data);
            // for EN_US { categoryTreeId: '0', categoryTreeVersion: '119' }    
        })
    });

