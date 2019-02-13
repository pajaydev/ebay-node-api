'use strict';

const { getRequest } = require('./request');
const urlObject = require('./buildURL');

const getAllCategories = function (categoryID) {
    this.options.name = categoryID ? categoryID : -1;
    this.options.operationName = "GetCategoryInfo";
    this.options.param = "CategoryID";
    const url = urlObject.buildShoppingUrl(this.options);
    console.log(url);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    )
};

const getUserDetails = function (input) {
    if (!input || typeof input !== 'object') throw new Error("Invalid input");
    if (!input.userId) throw new Error("Invalid Input, UserId is required");
    this.options.operationName = "GetUserProfile";
    this.options.param = "UserID";
    this.options.name = input.userId;
    this.options.includeSelector = input.details ? "Details" : null;
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    )
};

const getItemStatus = function (itemIds) {
    if (!userID) throw new Error("User ID is null or invalid");
    this.options.operationName = "GetUserProfile";
    this.options.param = "UserID";
    this.options.name = userID;
    this.options.includeSelector = this.options.details ? "Details" : null;
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    )
};

const getShippingCosts = function (itemIds) {
    if (!userID) throw new Error("User ID is null or invalid");
    this.options.operationName = "GetUserProfile";
    this.options.param = "UserID";
    this.options.name = userID;
    this.options.includeSelector = this.options.details ? "Details" : null;
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    )
};

module.exports = {
    getAllCategories,
    getUserDetails,
    getItemStatus,
    getShippingCosts
};

