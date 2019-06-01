'use strict';

const { getRequest } = require('./request');
const urlObject = require('./buildURL');
const makeString = require('make-string');

const getAllCategories = function (categoryID) {
    this.options.name = categoryID ? categoryID : -1;
    this.options.operationName = 'GetCategoryInfo';
    this.options.param = 'CategoryID';
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    );
};

const getUserDetails = function (input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.userId) throw new Error('Invalid Input, UserId is required');
    this.options.operationName = 'GetUserProfile';
    this.options.param = 'UserID';
    this.options.name = input.userId;
    this.options.includeSelector = input.details ? 'Details' : null;
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    );
};

const getItemStatus = function (itemIds) {
    if (!itemIds) throw new Error('User ID is null or invalid');
    this.options.operationName = 'GetItemStatus';
    this.options.param = 'ItemID';
    this.options.name = makeString(itemIds, { braces: 'false', quotes: 'no' });
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    );
};

const getShippingCosts = function (input) {
    if (!input || typeof input !== 'object') throw new Error('Invalid input');
    if (!input.itemId) throw new Error('Item ID is null or invalid');
    this.options.operationName = 'GetShippingCosts';
    this.options.param = 'ItemID';
    this.options.name = input.itemId;
    const countryCodeParam = input.destCountryCode ? '&DestinationCountryCode=' + input.destCountryCode : '';
    const postalCodeParam = input.destPostalCode ? '&DestinationPostalCode=' + input.destPostalCode : '';
    const params = countryCodeParam + postalCodeParam;
    let url = urlObject.buildShoppingUrl(this.options);
    url = url + params;
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    );
};

module.exports = {
    getAllCategories,
    getUserDetails,
    getItemStatus,
    getShippingCosts
};
