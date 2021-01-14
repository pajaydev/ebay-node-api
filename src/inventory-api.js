'use strict';
const makeString = require('make-string');
const { makeRequest } = require('./request');
const URI_SELL_EBAY = '/sell/inventory/v1';

/**
 * Call callback promise request
 * TODO Add this method? Or not?
 * @param uri {string} Uri request
 * @param method {string} POST GET DELETE PUT
 * @returns {Promise<{object}>}
 */
function callbackRequest(uri, method) {
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, uri, method, auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
}

/**
 * This call creates a new inventory item record or updates an existing inventory item record.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem
 * @param sku {string || int}
 * @param params {object}
 * @returns {Promise<object>}
 *
 */
const createOrReplaceInventoryItem = function (sku, params) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (typeof params !== 'undefined') {
        if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem)');
        this.options.data = JSON.stringify(params);
    }
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item/${sku}`, 'PUT', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item/${sku}`, 'GET', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof filters !== 'undefined') {
        if (typeof filters !== 'object') throw new Error('Expecting Object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems)');
        queryString = makeString(filters, { quotes: 'no', braces: 'false', seperator: '&', assignment: '=' });
    }
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item?${queryString}`, 'GET', auth).then((result) => {
            return resolve(result);
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
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item/${sku}`, 'DELETE', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkUpdatePriceQuantity)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.requests) throw new Error('Error requests is required');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.data = JSON.stringify(params);
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/bulk_update_price_quantity`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.requests) throw new Error('Error requests is required');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.data = JSON.stringify(params);
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/bulk_create_or_replace_inventory_item`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof sku !== 'undefined') { // If is present sku
        const param = {'requests': {'sky': sku}};
        this.options.data = JSON.stringify(param);
    }
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/bulk_get_inventory_item`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (typeof lang !== 'string') throw new Error('Expecting String to lang');
    if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/product_compatibility/methods/createOrReplaceProductCompatibility)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.compatibleProducts) throw new Error('Error compatibleProducts is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language': lang};
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item/${sku}/product_compatibility`, 'PUT', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item/${sku}/product_compatibility`, 'GET', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/inventory_item/${sku}/product_compatibility`, 'DELETE', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call creates an offer for a specific product on a specific eBay marketplace
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer
 * @param lang {string}
 * @param params {object}
 * @returns {Promise<{object}>}
 */
const createOffer = function (lang, params) {
    if (!lang) throw new Error('Error lang is required');
    if (typeof lang !== 'string') throw new Error('Expecting String to lang');
    if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/createOffer)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (!params.format) throw new Error('Error format is required');
    if (!params.marketplaceId) throw new Error('Error marketplaceId is required');
    if (!params.sku) throw new Error('Error sku is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language': lang}; // Add content language
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call retrieves all existing offers for the specified SKU value.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/updateOffer
 * @param offerId {string}
 * @param lang {string}
 * @param params {object}
 * @returns {Promise<{object}>}
 */
const updateOffer = function (offerId, lang, params) {
    if (!lang) throw new Error('Error lang is required');
    if (typeof offerId !== 'string') throw new Error('Expecting String to offerId');
    if (typeof lang !== 'string') throw new Error('Expecting String to lang');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (typeof params !== 'undefined') {
        if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/updateOffer)');
        this.options.data = JSON.stringify(params);
    }
    this.options.headers = {'Content-Language': lang}; // Add content language
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/${offerId}`, 'PUT', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call retrieves all existing offers for the specified SKU value.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffers#uri.marketplace_id
 * @param sku {string}
 * @param marketplaceId {MarketplaceEnum}
 * @param format {FormatTypeEnum}
 * @param limit {string}
 * @param offset {string}
 * @returns {Promise<{object}>}
 */
const getOffers = function (sku, marketplaceId, format, limit, offset) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (marketplaceId && !Array.isArray(marketplaceId)) throw new Error('Expecting array (Item marketplace_id)');
    if (format && !Array.isArray(format)) throw new Error('Expecting array (Item format)');
    if (limit && typeof limit !== 'string') throw new Error('Expecting string (Item marketplace_id)');
    if (offset && typeof offset !== 'string') throw new Error('Expecting string (Item offset)');
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    let queryParam = 'sku=' + sku;
    queryParam = queryParam + (marketplaceId ? '&marketplace_id=' + marketplaceId : '');
    queryParam = queryParam + (format ? '&format=' + format : '');
    queryParam = queryParam + (limit ? '&limit=' + limit : '');
    queryParam = queryParam + (offset ? '&offset=' + offset : '');
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer?${queryParam}`, 'GET', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call retrieves a specific offer.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffer
 * @param offerId {string} The unique identifier of the offer that is to be retrieved.
 * @param param {object}
 * @returns {Promise<{object}>}
 */
const getOffer = function (offerId, param) {
    if (!offerId) throw new Error('Error offerId is required');
    if (typeof offerId === 'object') throw new Error('Expecting String or Int of offerId');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    if (param) {
        if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffer#h2-input)');
        this.options.data = JSON.stringify(param);
    }
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/${offerId}`, 'GET', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call deletes a specific published or unpublished offer.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/deleteOffer
 * @param offerId {string}
 * @returns {Promise<{object}>}
 */
const deleteOffer = function (offerId) {
    if (!offerId) throw new Error('Error offerId is required');
    if (typeof offerId === 'object') throw new Error('Expecting String or Int of offerId');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/${offerId}`, 'DELETE', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call is used to convert an unpublished offer into a published offer, or live eBay listing.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOffer
 * @param offerId {string}
 * @returns {Promise<{object}>}
 */
const publishOffer = function (offerId) {
    if (!offerId) throw new Error('Error offerId is required');
    if (typeof offerId === 'object') throw new Error('Expecting String or Int of offerId');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/${offerId}`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call is used to convert all unpublished offers associated with an inventory item group into an active, multiple-variation listing.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOfferByInventoryItemGroup
 * @param inventoryItemGroupKey {string} This is the unique identifier of the inventory item group. All unpublished offers associated with this inventory item group will be published as a multiple-variation listing if the publishByInventoryItemGroup call is successful. The inventoryItemGroupKey identifier is automatically generated by eBay once an inventory item group is created.
 * @param marketplaceId {MarketplaceEnum} This is the unique identifier of the eBay site on which the multiple-variation listing will be published. The marketPlaceId enumeration values are found in MarketplaceIdEnum.
 * @returns {Promise<{object}>}
 */
const publishOfferByInventoryItemGroup = function (inventoryItemGroupKey, marketplaceId) {
    if (!inventoryItemGroupKey) throw new Error('Error inventoryItemGroupKey is required');
    if (!marketplaceId) throw new Error('Error marketplaceId is required');
    if (typeof inventoryItemGroupKey !== 'string') throw new Error('Expecting String of inventoryItemGroupKey');
    if (!Array.isArray(marketplaceId)) throw new Error('Expecting array (Item marketplace_id)');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    this.options.data = {'inventoryItemGroupKey': inventoryItemGroupKey, 'marketplaceId': marketplaceId};
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/publish_by_inventory_item_group/`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call is used to end a multiple-variation eBay listing that is associated with the specified inventory item group. This call only ends multiple-variation eBay listing associated with the inventory item group but does not delete the inventory item group object. Similarly, this call also does not delete any of the offers associated with the inventory item group, but instead all of these offers go into the unpublished state. If the seller wanted to relist the multiple-variation eBay listing, they could use the publishOfferByInventoryItemGroup method.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOfferByInventoryItemGroup
 * @param inventoryItemGroupKey {string}
 * @param marketplaceId {MarketplaceEnum}
 * @returns {Promise<{object}>}
 */
const withdrawOfferByInventoryItemGroup = function (inventoryItemGroupKey, marketplaceId) {
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    const value = {};
    if (inventoryItemGroupKey) {
        if (typeof inventoryItemGroupKey !== 'string') throw new Error('Expecting String of inventoryItemGroupKey');
        value.inventoryItemGroupKey = inventoryItemGroupKey;
    }
    if (marketplaceId) {
        if (!Array.isArray(marketplaceId)) throw new Error('Expecting array (Item marketplace_id)');
        value.marketplaceId = marketplaceId;
    }
    this.options.data = value;
    this.options.data = {'inventoryItemGroupKey': inventoryItemGroupKey, 'marketplaceId': marketplaceId};
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/withdraw_by_inventory_item_group`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call is used to retrieve the expected listing fees for up to 250 unpublished offers. An array of one or more offerId values are passed in under the offers container.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getListingFees
 * @param offers {object}
 * @returns {Promise<{object}>}
 */
const getListingFees = function (offers) {
    if (!offers) throw new Error('Error offers is required');
    if (!offers.offerId) throw new Error('Error offerId is required');
    if (!Array.isArray(offers.offerId)) throw new Error('Expecting array of offers.offerId');
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/offer/get_listing_fees`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
        });
    });
};

/**
 * This call is used to retrieve the expected listing fees for one to 250 unpublished offers.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkCreateOffer
 * @returns {Promise<{object}>}
 */
const bulkCreateOffer = function () {
    const auth = 'Bearer ' + this.options.appAccessToken;
    this.options.contentType = 'application/json';
    return new Promise((resolve, reject) => {
        makeRequest(this.options, `${URI_SELL_EBAY}/bulk_create_offer`, 'POST', auth).then((result) => {
            return resolve(result);
        }).then((error) => {
            return reject(error);
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
    createOffer,
    updateOffer,
    getOffers,
    getOffer,
    deleteOffer,
    publishOffer,
    publishOfferByInventoryItemGroup,
    withdrawOfferByInventoryItemGroup,
    getListingFees,
    bulkCreateOffer
};
