const Ebay = require('../src/index');
const { clientId, clientSecret } = require('./credentials');

let ebay = new Ebay({
    clientID: clientId,
    clientSecret: clientSecret,
});

// reference https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getDefaultCategoryTreeId
ebay.getApplicationToken()
    .then((data) => {
        ebay.setAppAccessToken(data);
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
