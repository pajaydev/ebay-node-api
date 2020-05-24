'use strict';

const { getRequest } = require('./request');
const { buildShoppingUrl } = require('./utils');
const makeString = require('make-string');

const getAllCategories = function (categoryID) {
    const requestURL = `${buildShoppingUrl(this, 'GetCategoryInfo')}&${stringifyUrl({ 'CategoryID': categoryID || -1 })}`;
    return getRequest(requestURL).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getUserDetails = function (input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.userID) throw new Error('User ID is required');
    let includeSelector = input.includeSelector ? input.includeSelector : 'Details';
    // Remove the includeSelector property so it doesn't get added twice due to stringifyUrl
    delete input.includeSelector;
    const requestUrl = `${buildShoppingUrl(this, 'GetUserProfile', includeSelector)}&${stringifyUrl(input)}`;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getItemStatus = function (itemIDs) {
    if (!itemIDs) throw new Error('Item ID is required');
    const paramsObj = {
        'ItemID': makeString(itemIDs, { braces: 'false', quotes: 'no' })
    };
    const requestUrl = `${buildShoppingUrl(this, 'GetItemStatus')}&${stringifyUrl(paramsObj)}`;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getShippingCosts = function (input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.itemID) throw new Error('Item ID is required');
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
const getMultipleItems = function (options) {
    if (!options || !options.itemID) throw new Error('Item ID is required');
    const requestUrl = `${buildShoppingUrl(this, 'GetMultipleItems')}&${stringifyUrl({ 'itemID': makeString(options.itemID, { braces: 'false', quotes: 'no' }) })}`;
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
const getSingleItem = function (itemID) {
    if (!itemID) throw new Error('Item ID is required');
    const requestUrl = `${buildShoppingUrl(this, 'GetSingleItem')}&${stringifyUrl({ 'ItemID': itemID })} `;
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const stringifyUrl = function (obj) {
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
