'use strict';
const makeString = require('make-string');
const { makeRequest } = require('./request');

/**
 * This call creates a new inventory item record or updates an existing inventory item record.
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem
 */
const createOrReplaceInventoryItem = function (sku, params) {
    if (!params) throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter');
    if (typeof sku === 'object' && typeof sku === 'int') throw new Error('Expecting String (Item Sku)');
    if (typeof params === 'string' && typeof params === 'int') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.data = JSON.stringify(params);
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
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItem
 */
const getInventoryItem = function (sku) {
    if (typeof sku === 'object' && typeof sku === 'int' ) throw new Error('Expecting String (Item Sku)');
    if (!sku) throw new Error('Error sku is required');
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
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems
 * 
 */
const getInventoryItems = function (filters) {
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    let queryString = '';
    if (filters){
        if (typeof filters === 'string' && typeof filters === 'int') throw new Error('Expecting Object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems)');
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
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/deleteInventoryItem
 */
const deleteInventoryItem = function (sku) {
    if (typeof sku === 'object' && typeof sku === 'int') throw new Error('Expecting String (Item Sku)');
    if (!sku) throw new Error('Error sku is required');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/inventory_item/${itemGroupId}`, 'DELETE', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
}

/**
 * This call is used by the seller to update the total ship-to-home quantity of an inventory item and/or to update the price and/or quantity of that same inventory item in an actual live offer.
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity
 */
const bulkUpdatePriceQuantity = function (params) {
    if (!params) throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter');
    if (typeof params === 'string' && typeof params === 'int') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
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
}

/**
 * This call is used by the seller to update the total ship-to-home quantity of an inventory item and/or to update the price and/or quantity of that same inventory item in an actual live offer.
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem
 */
const bulkCreateOrReplaceInventoryItem = function (params) {
    if (!params) throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter');
    if (typeof params === 'string' && typeof params === 'int') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
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
} 

/**
 * This call is used by the seller to retrieve up to 25 inventory item records.
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem
 */
const bulkGetInventoryItem = function (params) {
    if (!params) throw new Error('INVALID_REQUEST_PARMS --> Missing or invalid input parameter');
    if (typeof params === 'string' && typeof sku === 'int') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.data = JSON.stringify(params);
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `/sell/inventory/v1/bulk_get_inventory_item`, 'POST', auth).then((result) => {
            resolve(result);
        }).then((error) => {
            reject(error);
        });
    });
}

module.exports = {
    createOrReplaceInventoryItem,
    getInventoryItem,
    getInventoryItems,
    deleteInventoryItem,
    bulkUpdatePriceQuantity,
    bulkCreateOrReplaceInventoryItem,
    bulkGetInventoryItem
};
