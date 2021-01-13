'use strict';
const makeString = require('make-string');
const { makeRequest } = require('./request');

/**
 * This call creates a new inventory item record or updates an existing inventory item record.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem
 * @param sku {string || int}
 * @param params {object}
 * @returns {Promise<object>}
 */
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

/**
 * This call retrieves the inventory item record for a given SKU.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItem
 * @param sku {string || int}
 * @returns {Promise<object>}
 */
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

/**
 * This call retrieves all inventory item records defined for the seller's account.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems
 * @param filters {object}
 * @returns {Promise<object>}
 */
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

/**
 * This call is used to delete an inventory item record associated with a specified SKU.
 * @method
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/deleteInventoryItem
 * @param sku {string || int}
 * @returns {Promise<object>}
 */
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

/**
 * This call is used by the seller to update the total ship-to-home quantity of an inventory item and/or
 * to update the price and/or quantity of that same inventory item in an actual live offer.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
 * @param params {object}
 * @returns {Promise<{object}>}
 */
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

/**
 * This call is used by the seller to create and/or update up to 25 inventory item records.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem
 * @param params {object}
 * @returns {Promise<object>}
 */
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

/**
 * This call is used by the seller to retrieve up to 25 inventory item records.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem
 * @param sku {string || int}
 * @returns {Promise<object>}
 */
const bulkGetInventoryItem = function (sku) {
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    if (!(typeof sku === 'undefined')) { // If is present sku
        const param = {'requests': {'sky': sku}};
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

/**
 * This call is used by the seller to create or replace a list of products that are compatible with the inventory item.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/createOrReplaceProductCompatibility
 * @param sku {string || int}
 * @param params {object}
 * @param lang {string}
 * @returns {Promise<{object}>}
 */
const createOrReplaceProductCompatibility = function (sku, params, lang) {
    if (!sku) throw new Error('Error sku is required');
    if (!lang) throw new Error('Error lang is required');
    if (typeof sku === 'object') throw new Error('Expecting String or Int (Item Sku)');
    if (!(typeof lang === 'string')) throw new Error('Expecting String to lang');
    if (!(typeof params === 'object')) throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/createOrReplaceProductCompatibility)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.compatibleProducts) throw new Error('Error compatibleProducts is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language' :lang};
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

/**
 * This call is used by the seller to retrieve the list of products that are compatible with the inventory item.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/getProductCompatibility
 * @param sku {string || int}
 * @returns {Promise<object>}
 */
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

/**
 * This call is used by the seller to delete the list of products that are compatible with the inventory item.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/deleteProductCompatibility
 * @param sku {string}
 * @returns {Promise<object>}
 */
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

/**
 * This call creates an offer for a specific product on a specific eBay marketplace
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer
 * @param str {string || int}
 * @param lang {string}
 * @param params {object}
 * @returns {Promise<{object}>}
 * TODO da rivedere..
 */
const createOffer = function (str, lang, params) {
    if (!lang) throw new Error('Error lang is required');
    if (!(typeof lang === 'string')) throw new Error('Expecting String to lang');
    if (!(typeof params === 'object')) throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.format) throw new Error('Error format is required');
    if (!params.sku) throw new Error('Error sku is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language': lang}; // Add content language
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/offer`, 'PUT', auth).then((result) => {
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
    deleteProductCompatibility,
    createOffer
};
