'use strict';

const { buildSearchUrl } = require('./utils')
const { getRequest } = require('./request');
const FIND_ITEMS_BY_KEYWORD = 'findItemsByKeywords';
const FIND_ITEMS_BY_CATEGORY = 'findItemsByCategory';
const FIND_COMPLETED_ITEMS = 'findCompletedItems';
const FIND_ITEMS_ADV = 'findItemsAdvanced';

const findItemsByKeywords = options => {
    if (!options) {
        throw new Error('Keyword param is required');
    }
    let config = {
        operationName: FIND_ITEMS_BY_KEYWORD,
        param: 'keywords'
    };
    // support only keyword string.
    if (!options.keywords) config = { keywords: options };
    config.keywords = encodeURIComponent(options.keywords);
    config.additionalParam = constructAdditionalParams(options);
    const url = buildSearchUrl(config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsByKeywordsResponse;
    }, console.error // eslint-disable-line no-console
    );
};

const findItemsByCategory = categoryID => {
    if (!categoryID) throw new Error('Category ID is required');
    let config = {
        name: categoryID,
        operationName: FIND_ITEMS_BY_CATEGORY,
        param: 'categoryId'
    }
    const url = buildSearchUrl(config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsByCategoryResponse;
    }, console.error // eslint-disable-line no-console
    );
};

/**
 * searches for items whose listings are completed and are no longer available for
 * sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
 * @param {Object} options
 */
const findCompletedItems = options => {
    if (!options || options.keywords || options.categoryId) throw new Error('Keyword or category ID is required');
    if (options.keywords) {
        options.keywords = encodeURIComponent(options.keywords);
    }
    let config = {
        operationName: FIND_COMPLETED_ITEMS,
        additionalParam: constructAdditionalParams(options),
    }
    const url = buildSearchUrl(config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findCompletedItemsResponse;

    }, console.error // eslint-disable-line no-console
    );
};


/**
 * searches for items whose listings are completed and are no longer available for
 * sale by category (using categoryId), by keywords (using keywords), or a combination of the two.
 * @param {Object} options
 */
const findItemsAdvanced = options => {
    if (!options) throw new Error('Options param is required\nCheck here for input fields https://developer.ebay.com/DevZone/finding/CallRef/findItemsAdvanced.html#Input');
    if (options.keywords) {
        options.keywords = encodeURIComponent(options.keywords);
    }
    let config = {
        operationName: FIND_ITEMS_ADV,
        additionalParam: constructAdditionalParams(options),
    }
    const url = buildSearchUrl(config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsAdvancedResponse;
    }, console.error // eslint-disable-line no-console
    );
};

const getVersion = function () {
    let config = {
        operationName: 'getVersion',
    }
    const url = buildSearchUrl(config);
    return getRequest(url).then((data) => {
        return JSON.parse(data).getVersionResponse[0];
    }, console.error // eslint-disable-line no-console
    );
};

/**
 * Searches for items on eBay using specific eBay product values.
 * @param {Object} options
 */
const findItemsByProduct = options => {
    if (!options) throw new Error('Options param is required');
    if (!options.productId) throw new Error('Product ID is required.');
    let type = options.type ? options.type : 'ReferenceID';
    let config = {
        operationName: 'findItemsByProduct',
        additionalParam: constructAdditionalParams(options)
    }
    let url = buildSearchUrl(config);
    url = `${url}&productId.@type=${type}`;
    return getRequest(url).then((data) => {
        return JSON.parse(data).findItemsByProductResponse;

    }, console.error // eslint-disable-line no-console
    );
};


/**
 * Constructs query param based on some logic to support filter and aspect_filter params.
 * output will be keywords=iphone&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&itemFilter(2).name=SoldItemsOnly&itemFilter(2).value=true
 * @param {Object} options
 */
const constructAdditionalParams = (options) => {
    let params = '';
    let count = 0;
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            if (key === 'entriesPerPage' || key === 'pageNumber') {
                params = `${params}paginationInput.${key}=${options[key]}&`;
            }
            else if (key === 'keywords' || key === 'categoryId' || key === 'productId' || key === 'sortOrder') {
                params = `${params}${key}=${options[key]}&`;
            }
            else if (key === 'affiliate') {
                const innerParams = options[key];
                for (let innerKey in innerParams) {
                    params = `${params}${key}.${innerKey}=${innerParams[innerKey]}&`;
                }
            }
            else {
                params = `${params}itemFilter(${count}).name=${key}&
                itemFilter(${count}).value=${options[key]}&`;
                count += 1;
            }
        }
    }
    // replace extra space
    params = params.replace(/\s/g, '');
    return params.substring(0, params.length - 1);
};

module.exports = {
    findItemsByKeywords,
    findItemsByCategory,
    findCompletedItems,
    constructAdditionalParams,
    findItemsByProduct,
    findItemsAdvanced,
    getVersion
};
