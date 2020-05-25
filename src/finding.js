'use strict';

const { buildSearchUrl, constructAdditionalParams } = require('./utils')
const { getRequest } = require('./request');
const FIND_ITEMS_BY_KEYWORD = 'findItemsByKeywords';
const FIND_ITEMS_BY_CATEGORY = 'findItemsByCategory';
const FIND_COMPLETED_ITEMS = 'findCompletedItems';
const FIND_ITEMS_PROD = 'findItemsByProduct';
const FIND_ITEMS_ADV = 'findItemsAdvanced';
const FIND_EBAY_STORE = 'findItemsInEbayStores';

const findItemsByKeywords = function (options) {
    if (!options) {
        throw new Error('Keyword is required');
    }
    let config = {
        operationName: FIND_ITEMS_BY_KEYWORD,
        param: 'keywords'
    };
    // support only keyword string.
    if (!options.keywords) config = { keywords: options };
    config.keywords = encodeURIComponent(options.keywords);
    config.additionalParam = constructAdditionalParams(options);
    const url = buildSearchUrl(this, config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsByKeywordsResponse;
    }, console.error // eslint-disable-line no-console
    );
};

const findItemsByCategory = function (categoryID) {
    if (!categoryID) throw new Error('Category ID is required');
    let config = {
        name: categoryID,
        operationName: FIND_ITEMS_BY_CATEGORY,
        param: 'categoryId'
    }
    const url = buildSearchUrl(this, config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsByCategoryResponse;
    }, console.error // eslint-disable-line no-console
    );
};

/**
 * searches for items whose listings are completed and are no longer available for
 * sale by category (using categoryD), by keywords (using keywords), or a combination of the two.
 * @param {Object} options
 */
const findCompletedItems = function (options) {
    if (!options || !options.keywords || !options.categoryID) throw new Error('Keyword or category ID is required');
    if (options.keywords) {
        options.keywords = encodeURIComponent(options.keywords);
    }
    let config = {
        operationName: FIND_COMPLETED_ITEMS,
        additionalParam: constructAdditionalParams(options),
    }
    const url = buildSearchUrl(this, config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findCompletedItemsResponse;

    }, console.error // eslint-disable-line no-console
    );
};


/**
 * searches for items whose listings are completed and are no longer available for
 * sale by category (using categoryID), by keywords (using keywords), or a combination of the two.
 * @param {Object} options
 */
const findItemsAdvanced = function (options) {
    if (!options) throw new Error('Options is required\nCheck here for input fields https://developer.ebay.com/DevZone/finding/CallRef/findItemsAdvanced.html#Input');
    if (options.keywords) {
        options.keywords = encodeURIComponent(options.keywords);
    }
    let config = {
        additionalParam: constructAdditionalParams(options),
    }
    const url = buildSearchUrl(this, config, FIND_ITEMS_ADV);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsAdvancedResponse;
    }, console.error // eslint-disable-line no-console
    );
};

const getVersion = function () {
    const url = buildSearchUrl(this, {}, 'getVersion');
    return getRequest(url).then((data) => {
        return JSON.parse(data).getVersionResponse[0];
    }, console.error // eslint-disable-line no-console
    );
};

/**
 * Searches for items on eBay using specific eBay product values.
 * @param {Object} options
 */
const findItemsByProduct = function (options) {
    if (!options) throw new Error('Options is required');
    if (!options.productID) throw new Error('Product ID is required.');
    let type = options.type ? options.type : 'ReferenceID';
    let config = {
        additionalParam: constructAdditionalParams(options)
    }
    let url = buildSearchUrl(this, config, FIND_ITEMS_PROD);
    url = `${url}&productId.@type=${type}`;
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsByProductResponse;

    }, console.error // eslint-disable-line no-console
    );
};

const findItemsIneBayStores = function (options) {
    if (!options) throw new Error('Options is required');
    if (!options.storeName) throw new Error('Store name is required.');
    let config = {
        additionalParam: constructAdditionalParams(options)
    }
    return getRequest(buildSearchUrl(this, config, FIND_EBAY_STORE)).then((data) => {
        return JSON.parse(data).findItemsIneBayStoresResponse;

    }, console.error // eslint-disable-line no-console
    );
};

module.exports = {
    findItemsByKeywords,
    findItemsByCategory,
    findCompletedItems,
    findItemsByProduct,
    findItemsAdvanced,
    findItemsIneBayStores,
    getVersion
};
