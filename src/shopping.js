'use strict';

const { getRequest } = require('./request');
const urlObject = require('./buildURL');
const getAllCategories = function (categoryID) {
    this.options.name = categoryID ? categoryID : -1;
    this.options.operationName = "GetCategoryInfo";
    this.options.param = "CategoryID";
    const url = urlObject.buildShoppingUrl(this.options);
    return getRequest(url).then((data) => {
        return JSON.parse(data);
    }, console.error
    )
};

const getUserDetails = function (userID) {
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

