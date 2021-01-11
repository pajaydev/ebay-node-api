'use strict';
const makeString = require('make-string');
const { makeRequest } = require('./request');

const createOrReplaceInventoryItem = function (sku, params) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!(typeof params === 'undefined')) {
        if (!(typeof params === 'object')) throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem)');
        this.options.data = JSON.stringify(params);
    }
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${sku}`, 'PUT', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const getInventoryItem = function (sku) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${sku}`, 'GET', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const getInventoryItems = function (filters) {
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    let queryString = '';
    if (!(typeof filters === 'undefined')) {
        if (!(typeof filters === 'object')) throw new Error('Expecting Object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems)');
        queryString = makeString(filters, { quotes: 'no', braces: 'false', seperator: '&', assignment: '=' });
    }
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item?${queryString}`, 'GET', auth).then((result) => {
            return resolve(JSON.parse(result));
        }).then((error) => {
            return reject(error);
        });
    });
};

const deleteInventoryItem = function (sku) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${sku}`, 'DELETE', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const bulkUpdatePriceQuantity = function (params) {
    if (!params) throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter');
    if (!(typeof params === 'object')) throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.requests) throw new Error('Error requests is required');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.data = JSON.stringify(params);
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/bulk_update_price_quantity`, 'POST', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const bulkCreateOrReplaceInventoryItem = function (params) {
    if (!params) throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter');
    if (!(typeof params === 'object')) throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.requests) throw new Error('Error requests is required');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.data = JSON.stringify(params);
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/bulk_create_or_replace_inventory_item`, 'POST', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const bulkGetInventoryItem = function (sku) {
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    if (!(typeof sku === 'undefined')) { // If is present sku
        const param = {'requests':{'sky': sku}};
        this.options.data = JSON.stringify(param);
    }
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/bulk_get_inventory_item`, 'POST', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};
// TODO Son arrivato qua
const createOrReplaceProductCompatibility = function (sku, params, lang) {
    if (!sku) throw new Error('Error sku is required');
    if (!lang) throw new Error('Error lang is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!(typeof lang === 'string')) throw new Error('Expecting String to lang');
    if (!(typeof params === 'object')) throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/createOrReplaceProductCompatibility)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.compatibleProducts) throw new Error('Error compatibleProducts is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language': lang}; // Add content language
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${sku}/product_compatibility`, 'PUT', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const getProductCompatibility = function (sku) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${sku}/product_compatibility`, 'GET', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

const deleteProductCompatibility = function (sku) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${sku}/product_compatibility`, 'DELETE', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
};

module.exports = {
    createOrReplaceInventoryItem,
    getInventoryItem,
    getInventoryItems,
    deleteInventoryItem,
    bulkUpdatePriceQuantity,
    bulkCreateOrReplaceInventoryItem,
    bulkGetInventoryItem,
    createOrReplaceProductCompatibility,
    getProductCompatibility,
    deleteProductCompatibility
};
