'use strict';

const { getRequest } = require('./request');
const urlObject = require('./buildURL');
const makeString = require('make-string');

const getAllCategories = function (categoryID) {
    const paramsObj = {
        'CategoryID': categoryID || -1
    };
    const requestURL = urlObject.buildShoppingUrl(this.options, 'GetCategoryInfo') + stringifyUrl(paramsObj);
    return getRequest(requestURL).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getUserDetails = function (input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.userId) throw new Error('invalid_request_error -> userId is null or invalid');
    const requestUrl = urlObject.buildShoppingUrl(this.options, 'GetUserProfile') + stringifyUrl(input);
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getItemStatus = function (itemIds) {
    if (!itemIds) throw new Error('invalid_request_error -> itemIds is null or invalid');
    const paramsObj = {
        'ItemID': makeString(itemIds, { braces: 'false', quotes: 'no' })
    };
    const requestUrl = urlObject.buildShoppingUrl(this.options, 'GetItemStatus') + stringifyUrl(paramsObj);
    return getRequest(requestUrl).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getShippingCosts = function (input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.itemId) throw new Error('invalid_request_error -> Item id is null or invalid');
    const url = urlObject.buildShoppingUrl(this.options, 'GetShippingCosts') + stringifyUrl(input);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error // eslint-disable-line no-console
    );
};

const getSingleItem = function (itemId) {
    if (!itemId) throw new Error('invalid_request_error -> Item ID is null or invalid');
    const requestUrl = urlObject.buildShoppingUrl(this.options, 'GetSingleItem') + stringifyUrl({ 'ItemID': itemId });
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
    getSingleItem
};
