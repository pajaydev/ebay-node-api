const { makeRequest } = require('./request');
const { upperCase } = require('./utils');

/**
  * @method getDefaultCategoryTreeId {Function}
  * @param {String} marketPlaceId = default = EBAY_US
  */

const DEFAULT_CATEGORY_TREE = "EBAY_US";
const getDefaultCategoryTreeId = function (marketPlaceId) {
    if (!marketPlaceId) marketPlaceId = DEFAULT_CATEGORY_TREE;
    marketPlaceId = upperCase(marketPlaceId);
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    return makeRequest('api.ebay.com', `/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=${marketPlaceId}`, 'GET', this.options.body, auth).then((result) => {
        return JSON.parse(result);
    });
};

/**
  * @method getCategoryTree {Function}
  * @param {Integer} categoryId = default = 0
  */

const getCategoryTree = function (categoryId) {
    if (!categoryId) categoryId = 0;
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    return makeRequest('api.ebay.com', `/commerce/taxonomy/v1_beta/category_tree/${categoryId}`, 'GET', this.options.body, auth).then((result) => {
        return JSON.parse(result);
    });
};

/**
  * @method getCategorySubtree {Function}
  * @param {String} categoryId = identifier of the category at the top of the subtree.
  * @param {String} categoryTreeId = The unique identifier of the eBay category tree from which a category subtree is being requested.
  */

const getCategorySubtree = function (categoryId, categoryTreeId) {
    if (!categoryId) categoryId = 0;
    if (!categoryTreeId) throw new Error("Missing Categor tree id \n Refer documentation here https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySubtree#h2-samples");
    if (!this.options.access_token) throw new Error("Missing Access token, Generate access token");
    const auth = "Bearer " + this.options.access_token;
    return makeRequest('api.ebay.com', `/commerce/taxonomy/v1_beta/category_tree/${categoryId}/get_category_subtree?category_id=${categoryTreeId}`, 'GET', this.options.body, auth).then((result) => {
        return JSON.parse(result);
    });
};

module.exports = { getDefaultCategoryTreeId, getCategoryTree, getCategorySubtree };