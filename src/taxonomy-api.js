'use strict';
const { makeRequest } = require('./request');
const { upperCase } = require('./utils');

/**
  * @method getDefaultcategoryTreeID {Function}
  * @param {String} marketPlaceId = default = EBAY_US
  */

const DEFAULT_CATEGORY_TREE = 'EBAY_US';
const getDefaultCategoryTreeId = marketPlaceId => {
    if (!marketPlaceId) marketPlaceId = DEFAULT_CATEGORY_TREE;
    marketPlaceId = upperCase(marketPlaceId);
    if (!this.appAccessToken) throw new Error('Missing Access token, Generate access token');
    let config = {
        contentType: 'application/json'
    };
    const auth = 'Bearer ' + this.appAccessToken;
    return makeRequest(this, config, `/commerce/taxonomy/v1_beta/get_default_category_tree_id?marketplace_id=${marketPlaceId}`, 'GET', auth).then((result) => {
        return JSON.parse(result);
    });
};

/**
  * @method getCategoryTree {Function}
  * @param {Integer} categoryTreeID = default = 0
  */

const getCategoryTree = function (categoryTreeID) {
    if (!categoryTreeID) categoryTreeID = 0;
    if (!this.appAccessToken) throw new Error('Missing Access token, Generate access token');
    let config = {
        contentType: 'application/json'
    };
    const auth = 'Bearer ' + this.appAccessToken;
    return makeRequest(this, config, `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeID}`, 'GET', auth).then((result) => {
        return JSON.parse(result);
    });
};

/**
  * @method getCategorySubtree {Function}
  * @param {String} categoryID = identifier of the category at the top of the subtree.
  * @param {String} categoryTreeID = The unique identifier of the eBay category tree from which a category subtree is being requested.
  */

const getCategorySubtree = function (categoryTreeID, categoryID) {
    if (!categoryTreeID) categoryTreeID = 0;
    if (!categoryID) throw new Error('Missing Categor id \n Refer documentation here https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySubtree#h2-samples');
    if (!this.appAccessToken) throw new Error('Missing Access token, Generate access token');
    let config = {
        contentType: 'application/json'
    };
    const auth = 'Bearer ' + this.appAccessToken;
    return makeRequest(this, config, `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeID}/get_category_subtree?category_id=${categoryID}`, 'GET', auth).then((result) => {
        return JSON.parse(result);
    });
};

/**
  * @method getCategorySuggestions {Function}
  * @param {String} categoryTreeID = identifier of the category at the top of the subtree.
  * @param {String} keyword = input string to get CategorySuggestions.
  */

const getCategorySuggestions = function (categoryTreeID, keyword) {
    if (!categoryTreeID) categoryTreeID = 0;
    if (!keyword) throw new Error('Missing keyword \n Refer documentation here https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getCategorySuggestions');
    if (!this.appAccessToken) throw new Error('Missing Access token, Generate access token');
    let config = {
        contentType: 'application/json'
    };
    const auth = 'Bearer ' + this.appAccessToken;
    return makeRequest(this, config, `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeID}/get_category_suggestions?q=${keyword}`, 'GET', auth).then((result) => {
        return JSON.parse(result);
    });
};

/**
  * @method getItemAspectsForCategory {Function}
  * @param {String} categoryID = identifier of the category at the top of the subtree.
  * @param {String} keyword = input string to get CategorySuggestions.
  */
const getItemAspectsForCategory = function (categoryTreeID, categoryID) {
    if (!categoryTreeID) categoryTreeID = 0;
    if (!categoryID) throw new Error('Missing Category id \n Refer documentation here https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getItemAspectsForCategory#h2-samples');
    if (!this.appAccessToken) throw new Error('Missing Access token, Generate access token');
    let config = {
        contentType: 'application/json'
    };
    const auth = 'Bearer ' + this.appAccessToken;
    return makeRequest(this, config, `/commerce/taxonomy/v1_beta/category_tree/${categoryTreeID}/get_item_aspects_for_category?category_id=${categoryID}`, 'GET', auth).then((result) => {
        return JSON.parse(result);
    });
};

module.exports = {
    getDefaultCategoryTreeId,
    getCategoryTree,
    getCategorySubtree,
    getCategorySuggestions,
    getItemAspectsForCategory
};
