const { makeRequest } = require('./request');
const { upperCase } = require('./utils');

const getDefaultCategoryTreeId = function (marketPlaceId) {
    if (!marketPlaceId) marketPlaceId = "EBAY_US";
    marketPlaceId = upperCase(marketPlaceId);
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    return makeRequest('api.ebay.com', `/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=${marketPlaceId}`, 'GET', this.options.body, auth).then((result) => {
        let resultJSON = JSON.parse(result);
        //this.setAccessToken(resultJSON);
        return resultJSON;
    });
};

module.exports = { getDefaultCategoryTreeId };