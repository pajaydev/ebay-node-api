'use strict';

const { getRequest } = require('./request');
const { buildShoppingUrl } = require('./utils');
const makeString = require('make-string');

const getAllCategories = categoryID => {
    const requestURL = `${buildShoppingUrl(this, 'GetCategoryInfo')}&${stringifyUrl({ 'CategoryID': categoryID || -1 })}`;
    return getRequest(requestURL).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getUserDetails = input => {
    if (!input || typeof input !== 'object') throw new Error('Input param is required');
    if (!input.userId) throw new Error('userId is required');
    input.includeSelector = input.includeSelector ? input.includeSelector : 'Details';
    const requestUrl = `${buildShoppingUrl(this, 'GetUserProfile')}&${stringifyUrl(input)}`;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getItemStatus = itemIds => {
    if (!itemIds) throw new Error('Item ID param is required');
    const paramsObj = {
        'ItemID': makeString(itemIds, { braces: 'false', quotes: 'no' })
    };
    const requestUrl = `${buildShoppingUrl(this, 'GetItemStatus')}&${stringifyUrl(paramsObj)}`;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getShippingCosts = input => {
    if (!input || typeof input !== 'object') throw new Error('iInput param is required');
    if (!input.itemId) throw new Error('Item ID param is required');
    const url = `${buildShoppingUrl(this, 'GetShippingCosts')}&${stringifyUrl(input)} `;
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

/**
  * @method getMultipleItems {Function}
  * Retrieves publicly visible details about for one or more listings on eBay.
  * @param {Object} options (required)
  */
const getMultipleItems = options => {
    if (!options || !options.itemId) throw new Error('Item ID param is required');
    const requestUrl = `${buildShoppingUrl(this, 'GetMultipleItems')}&${stringifyUrl({ 'itemId': makeString(options.itemId, { braces: 'false', quotes: 'no' }) })}`;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};


/**
  * @method getSingleItem {Function}
  * Retrieves publicly visible details about one listing on eBay.
  * @param {String} itemId (required)
  */
const getSingleItem = itemId => {
    if (!itemId) throw new Error('invalid_request_error -> Item ID is null or invalid');
    const requestUrl = `${buildShoppingUrl(this, 'GetSingleItem')}&${stringifyUrl({ 'ItemID': itemId })} `;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const stringifyUrl = (obj) => {
    return makeString(obj, { braces: 'false', assignment: '=', quotes: 'no', seperator: '&' });
};

module.exports = {
    getAllCategories,
    getUserDetails,
    getItemStatus,
    getShippingCosts,
    getSingleItem,
    getMultipleItems
};
