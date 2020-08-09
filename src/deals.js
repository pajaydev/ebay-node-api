'use strict';
const { makeRequest } = require('./request');

module.exports = {
    //https://developer.ebay.com/api-docs/buy/deal/resources/deal_item/methods/getDealItems
    getDealItems: function(categoryId){
        const auth = 'Bearer ' + this.options.appAccessToken;
        console.log(this.options.appAccessToken);
        return makeRequest(this.options, `/buy/deal/v1/deal_item?category_ids=${categoryId}`, 'GET', auth).then((result) => {
            console.log(result);
            return JSON.parse(result);
        });
    },

}