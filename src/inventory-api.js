'use strict';
const makeString = require('make-string');
const { makeRequest } = require('./request');

/**
 * Url inventory Api /sell/inventory/v1
 * @type {string}
 */
const URI_SELL_EBAY = '/sell/inventory/v1';

/**
 * String of url for scope oauth 'https://api.ebay.com/oauth/api_scope/sell.inventory'
 * @type {string}
 */
const SCOPE_INVENTORY_API = 'https://api.ebay.com/oauth/api_scope/sell.inventory';

/**
 * tring of url for scope oauth readonly 'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly'
 * @type {string}
 */
const SCOPE_INVENTORY_API_READ_ONLY = 'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly';

/**
 * Call callback promise request
 * @param uri {string} Uri request
 * @param method {string} POST GET DELETE PUT
 * @param checkScopeReadOnly {boolean}
 * @returns {Promise<{object}>}
 */
function callbackRequest(uri, method, checkScopeReadOnly = false) {
    if (!this.options.appAccessToken) throw new Error('INVALID_AUTH_TOKEN --> Missing Access token, Generate access token');
    if (checkScopeReadOnly){
        if (this.options.body.scope !== SCOPE_INVENTORY_API || this.options.body.scope !== SCOPE_INVENTORY_API_READ_ONLY) throw new Error('INVALID_SCOPE_URL --> Invalid scope url, correct https://api.ebay.com/oauth/api_scope/sell.inventory');
    } else {
        if (this.options.body.scope !== SCOPE_INVENTORY_API) throw new Error('INVALID_SCOPE_URL --> Invalid scope url, correct https://api.ebay.com/oauth/api_scope/sell.inventory');
    }
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
 */
const createOrReplaceInventoryItem = function (sku, params) {
    if (!sku) throw new Error('Error sku is required');
    if (typeof sku !== 'string' || typeof sku !== 'int') throw new Error('Expecting String or Int (Item Sku)');
    if (typeof params !== 'undefined') {
        if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/createOrReplaceInventoryItem)');
        this.options.data = JSON.stringify(params);
    }
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item/${sku}`, 'PUT');
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
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item/${encodeURIComponent(sku)}`, 'GET');
};

/**
 * This call retrieves all inventory item records defined for the seller's account.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems
 * @param filters {object}
 * @returns {Promise<object>}
 */
const getInventoryItems = function (filters) {
    let queryString = '';
    if (typeof filters !== 'undefined') {
        if (typeof filters !== 'object') throw new Error('Expecting Object (https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems)');
        queryString = makeString(filters, { quotes: 'no', braces: 'false', seperator: '&', assignment: '=' });
    }
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item?${queryString}`, 'GET');
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
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item/${encodeURIComponent(sku)}`, 'DELETE');
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
    if (!params.requests) throw new Error('Error requests is required');
    this.options.data = JSON.stringify(params);
    return callbackRequest(`${URI_SELL_EBAY}/bulk_update_price_quantity`, 'POST');
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
    if (!params.requests) throw new Error('Error requests is required');
    this.options.data = JSON.stringify(params);
    return callbackRequest(`${URI_SELL_EBAY}/bulk_create_or_replace_inventory_item`, 'POST');
};

/**
 * This call is used by the seller to retrieve up to 25 inventory item records.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkGetInventoryItem
 * @param sku {string || int}
 * @returns {Promise<object>}
 */
const bulkGetInventoryItem = function (sku) {
    if (typeof sku !== 'undefined') { // If is present sku
        const param = {'requests': {'sky': encodeURIComponent(sku)}};
        this.options.data = JSON.stringify(param);
    }
    return callbackRequest(`${URI_SELL_EBAY}/bulk_get_inventory_item`, 'POST');
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
    if (!params.compatibleProducts) throw new Error('Error compatibleProducts is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language': lang};
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item/${encodeURIComponent(sku)}/product_compatibility`, 'PUT');
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
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item/${encodeURIComponent(sku)}/product_compatibility`, 'GET');
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
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item/${encodeURIComponent(sku)}/product_compatibility`, 'DELETE');
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
    if (!params.format) throw new Error('Error format is required');
    if (!params.marketplaceId) throw new Error('Error marketplaceId is required');
    if (!params.sku) throw new Error('Error sku is required');
    this.options.data = JSON.stringify(params);
    this.options.headers = {'Content-Language': lang};
    return callbackRequest(`${URI_SELL_EBAY}/offer`, 'POST');
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
    if (typeof params !== 'undefined') {
        if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/updateOffer)');
        this.options.data = JSON.stringify(params);
    }
    this.options.headers = {'Content-Language': lang};
    return callbackRequest(`${URI_SELL_EBAY}/offer/${encodeURIComponent(offerId)}`, 'PUT');
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
    let queryParam = 'sku=' + sku;
    queryParam = queryParam + (marketplaceId ? '&marketplace_id=' + marketplaceId : '');
    queryParam = queryParam + (format ? '&format=' + format : '');
    queryParam = queryParam + (limit ? '&limit=' + limit : '');
    queryParam = queryParam + (offset ? '&offset=' + offset : '');
    return callbackRequest(`${URI_SELL_EBAY}/offer?${queryParam}`, 'GET');
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
    if (typeof offerId !== 'string') throw new Error('Expecting String of offerId');
    if (param) {
        if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffer#h2-input)');
        this.options.data = JSON.stringify(param);
    }
    return callbackRequest(`${URI_SELL_EBAY}/offer/${encodeURIComponent(offerId)}`, 'GET');
};

/**
 * This call deletes a specific published or unpublished offer.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/deleteOffer
 * @param offerId {string}
 * @returns {Promise<{object}>}
 */
const deleteOffer = function (offerId) {
    if (!offerId) throw new Error('Error offerId is required');
    if (typeof offerId !== 'string') throw new Error('Expecting String of offerId');
    return callbackRequest(`${URI_SELL_EBAY}/offer/${encodeURIComponent(offerId)}`, 'DELETE');
};

/**
 * This call is used to convert an unpublished offer into a published offer, or live eBay listing.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOffer
 * @param offerId {string}
 * @returns {Promise<{object}>}
 */
const publishOffer = function (offerId) {
    if (!offerId) throw new Error('Error offerId is required');
    if (typeof offerId !== 'string') throw new Error('Expecting String of offerId');
    return callbackRequest(`${URI_SELL_EBAY}/offer/${encodeURIComponent(offerId)}`, 'POST');
};

/**
 * This call is used to convert all unpublished offers associated with an inventory item group into an active, multiple-variation listing.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/publishOfferByInventoryItemGroup
 * @param inventoryItemGroupKey {string} This is the unique identifier of the inventory item group. All unpublished offers associated with this inventory item group will be published as a multiple-variation listing if the publishByInventoryItemGroup call is successful. The inventoryItemGroupKey identifier is automatically generated by eBay once an inventory item group is created.
 * @param marketplaceId {MarketplaceEnum[]} This is the unique identifier of the eBay site on which the multiple-variation listing will be published. The marketPlaceId enumeration values are found in MarketplaceIdEnum.
 * @returns {Promise<{object}>}
 */
const publishOfferByInventoryItemGroup = function (inventoryItemGroupKey, ...marketplaceId) {
    if (!inventoryItemGroupKey) throw new Error('Error inventoryItemGroupKey is required');
    if (!marketplaceId) throw new Error('Error marketplaceId is required');
    if (typeof inventoryItemGroupKey !== 'string') throw new Error('Expecting String of inventoryItemGroupKey');
    if (!Array.isArray(marketplaceId)) throw new Error('Expecting array (Item marketplace_id)');
    this.options.data = JSON.stringify({'inventoryItemGroupKey': inventoryItemGroupKey, 'marketplaceId': marketplaceId});
    return callbackRequest(`${URI_SELL_EBAY}/offer/publish_by_inventory_item_group/`, 'POST');
};

/**
 * This call is used to end a multiple-variation eBay listing that is associated with the specified inventory item group. This call only ends multiple-variation eBay listing associated with the inventory item group but does not delete the inventory item group object. Similarly, this call also does not delete any of the offers associated with the inventory item group, but instead all of these offers go into the unpublished state. If the seller wanted to relist the multiple-variation eBay listing, they could use the publishOfferByInventoryItemGroup method.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOfferByInventoryItemGroup
 * @param inventoryItemGroupKey {string}
 * @param marketplaceId {MarketplaceEnum[]}
 * @returns {Promise<{object}>}
 */
const withdrawOfferByInventoryItemGroup = function (inventoryItemGroupKey, ...marketplaceId) {
    const value = {};
    if (inventoryItemGroupKey) {
        if (typeof inventoryItemGroupKey !== 'string') throw new Error('Expecting String of inventoryItemGroupKey');
        value.inventoryItemGroupKey = inventoryItemGroupKey;
    }
    if (marketplaceId) {
        if (!Array.isArray(marketplaceId)) throw new Error('Expecting array (Item marketplace_id)');
        value.marketplaceId = marketplaceId;
    }
    this.options.data = JSON.stringify(value);
    return callbackRequest(`${URI_SELL_EBAY}/offer/withdraw_by_inventory_item_group`, 'POST');
};

/**
 * This call is used to retrieve the expected listing fees for up to 250 unpublished offers. An array of one or more offerId values are passed in under the offers container.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getListingFees
 * @param offers {object}
 * @returns {Promise<{object}>}
 */
const getListingFees = function (offers) {
    if (!offers) throw new Error('Error offers is required');
    if (typeof offers !== 'object') throw new Error('Expecting object of offers');
    if (!offers.offerId) throw new Error('Error offerId is required');
    if (!Array.isArray(offers.offerId)) throw new Error('Expecting array of offers.offerId');
    return callbackRequest(`${URI_SELL_EBAY}/offer/get_listing_fees`, 'POST');
};

/**
 * This call is used to retrieve the expected listing fees for one to 250 unpublished offers.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkCreateOffer
 * @returns {Promise<{object}>}
 */
const bulkCreateOffer = function () {
    return callbackRequest(`${URI_SELL_EBAY}/bulk_create_offer`, 'POST');
};

/**
 * This call is used to convert unpublished offers (up to 25) into published offers, or live eBay listings. The unique identifier (offerId) of each offer to publlish is passed into the request payload. It is possible that some unpublished offers will be successfully created into eBay listings, but others may fail. The response payload will show the results for each offerId value that is passed into the request payload. The errors and warnings containers will be returned for an offer that had one or more issues being published.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/bulkPublishOffer
 * @param offerId {string}
 * @returns {Promise<{object}>}
 */
const bulkPublishOffer = function (...offerId) {
    if (Array.isArray(offerId)) throw new Error('Expecting array of offerId');
    if (offerId.length > 25) throw new Error('Error max 25 offerId');
    const requests = [];
    offerId.forEach((e) => {
        requests.push({'offerId': e});
    });
    this.options.data = JSON.stringify({'requests': requests});
    return callbackRequest(`${URI_SELL_EBAY}/bulk_publish_offer`, 'POST');
};

/**
 * This call is used to end a single-variation listing that is associated with the specified offer. This call is used in place of the deleteOffer call if the seller only wants to end the listing associated with the offer but does not want to delete the offer object. With this call, the offer object remains, but it goes into the unpublished state, and will require a publishOffer call to relist the offer.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/withdrawOffer
 * @param offerId {string}
 * @returns {Promise<{object}>}
 */
const withdrawOffer = function (offerId) {
    if (!offerId) throw new Error('Error offerId is required');
    if (typeof offerId !== 'string') throw  new Error('Expecting String of offerId');
    return callbackRequest(`${URI_SELL_EBAY}/offer/${encodeURIComponent(offerId)}/withdraw`, 'POST');
};

/**
 * This call creates a new inventory item group or updates an existing inventory item group. It is up to sellers whether they want to create a complete inventory item group record right from the start, or sellers can provide only some information with the initial createOrReplaceInventoryItemGroup call, and then make one or more additional createOrReplaceInventoryItemGroup calls to complete the inventory item group record. Upon first creating an inventory item group record, the only required elements are the inventoryItemGroupKey identifier in the call URI, and the members of the inventory item group specified through the variantSKUs array in the request payload.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/createOrReplaceInventoryItemGroup
 * @param inventoryItemGroupKey {string}
 * @returns {Promise<{object}>}
 */
const createOrReplaceInventoryItemGroup = function (inventoryItemGroupKey) {
    if (!inventoryItemGroupKey) throw new Error('Error inventoryItemGroupKey is required');
    if (typeof inventoryItemGroupKey !== 'string') throw  new Error('Expecting String of inventoryItemGroupKey');
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item_group/${encodeURIComponent(inventoryItemGroupKey)}`, 'PUT');
};

/**
 * This call retrieves the inventory item group for a given inventoryItemGroupKey value. The inventoryItemGroupKey value is passed in at the end of the call URI.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item_group/methods/getInventoryItemGroup
 * @param inventoryItemGroupKey {string}
 * @returns {Promise<{object}>}
 */
const getInventoryItemGroup = function (inventoryItemGroupKey) {
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item_group/${encodeURIComponent(inventoryItemGroupKey)}`, 'GET');
};

/**
 * This call deletes the inventory item group for a given inventoryItemGroupKey value.
 * @param inventoryItemGroupKey {string}
 * @returns {Promise<{string}>}
 */
const deleteInventoryItemGroup = function (inventoryItemGroupKey) {
    return callbackRequest(`${URI_SELL_EBAY}/inventory_item_group/${encodeURIComponent(inventoryItemGroupKey)}`, 'DELETE');
};

/**
 * This call is used to convert existing eBay Listings to the corresponding Inventory API objects.
 * If an eBay listing is successfully migrated to the Inventory API model, new Inventory Location, Inventory Item,
 * and Offer objects are created. For a multiple-variation listing that is successfully migrated,
 * in addition to the three new Inventory API objects just mentioned, an Inventory Item Group object will also be created.
 * If the eBay listing is a motor vehicle part or accessory listing with a compatible vehicle list (ItemCompatibilityList container
 * in Trading API's Add/Revise/Relist/Verify calls), a Product Compatibility object will be created.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/listing/methods/bulkMigrateListing
 * @param listingIds {string}
 * @returns {Promise<{object}>}
 */
const bulkMigrateListing = function (...listingIds) {
    if (Array.isArray(listingIds)) throw new Error('Expecting array of offerId');
    if (listingIds.length > 25) throw new Error('Error max 25 offerId');
    const requests = [];
    listingIds.forEach((e) => {
        requests.push({'listingId': e});
    });
    this.options.data = JSON.stringify({'requests': requests});
    return callbackRequest(`${URI_SELL_EBAY}/bulk_migrate_listing`, 'POST');
};

/**
 * Use this call to create a new inventory location. In order to create and publish an offer (and create an eBay listing), a seller must have at least one inventory location, as every offer must be associated with a location.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/createInventoryLocation
 * @param merchantLocationKey {string}
 * @param params {object}
 * @returns {Promise<{object}>}
 */
const createInventoryLocation = function (merchantLocationKey, params) {
    if (!merchantLocationKey) throw new Error('Error merchantLocationKey is required');
    if (typeof merchantLocationKey !== 'string') throw new Error('Expecting String of merchantLocationKey');
    if (!params) throw new Error('Error params is required');
    if (typeof params !== 'object') throw new Error('Expecting object (https://developer.ebay.com/api-docs/sell/inventory/resources/offer/methods/getOffer#h2-input)');
    if (!params.location) throw new Error('Error location is required');
    if (!params.location.address) throw new Error('Error address is required');
    if (!params.location.address.country) throw new Error('Error location.address.country is required');
    if (!params.operatingHours.dayOfWeekEnum) throw new Error('Error operatingHours.dayOfWeekEnum is required');
    if (!params.operatingHours.intervals) throw new Error('Error operatingHours.intervals is required');
    if (!params.ooperatingHours.intervals.close	) throw new Error('Error operatingHours.intervals.close is required');
    if (!params.operatingHours.intervals.open) throw new Error('Error operatingHours.intervals.open is required');
    if (!params.specialHours.intervals) throw new Error('Error specialHours.intervals is required');
    if (!params.specialHours.intervals.close) throw new Error('Error specialHours.intervals.close is required');
    if (!params.specialHours.intervals.open) throw new Error('Error specialHours.intervals.open is required');
    this.options.data = JSON.stringify(params);
    return callbackRequest(`${URI_SELL_EBAY}/location/${merchantLocationKey}`, 'POST')
};

/**
 * This call deletes the inventory location that is specified in the merchantLocationKey path parameter. Note that deleting a location will not affect any active eBay listings associated with the deleted location, but the seller will not be able modify the offers associated with the inventory location once it is deleted.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/deleteInventoryLocation
 * @param merchantLocationKey {string}
 * @returns {Promise<{object}>}
 */
const deleteInventoryLocation = function (merchantLocationKey) {
    if (!merchantLocationKey) throw new Error('Error merchantLocationKey is required');
    if (typeof merchantLocationKey !== "string") throw new Error('Expecting String of merchantLocationKey');
    return callbackRequest(`${URI_SELL_EBAY}/bulk_migrate_listing/${merchantLocationKey}`, 'DELETE');
};

/**
 * This call disables the inventory location that is specified in the merchantLocationKey path parameter. Sellers can not load/modify inventory to disabled inventory locations. Note that disabling an inventory location will not affect any active eBay listings associated with the disabled location, but the seller will not be able modify the offers associated with a disabled inventory location.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/disableInventoryLocation
 * @param merchantLocationKey {string}
 * @returns {Promise<{object}>}
 */
const disableInventoryLocation = function (merchantLocationKey) {
    if (!merchantLocationKey) throw new Error('Error merchantLocationKey is required');
    if (typeof merchantLocationKey !== "string") throw new Error('Expecting String of merchantLocationKey');
    return callbackRequest(`${URI_SELL_EBAY}/location/${merchantLocationKey}/disable`, 'POST');
};

/**
 * This call enables a disabled inventory location that is specified in the merchantLocationKey path parameter. Once a disabled inventory location is enabled, sellers can start loading/modifying inventory to that inventory location.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/enableInventoryLocation
 * @param merchantLocationKey {string}
 * @returns {Promise<{object}>}
 */
const enableInventoryLocation = function (merchantLocationKey) {
    if (!merchantLocationKey) throw new Error('Error merchantLocationKey is required');
    if (typeof merchantLocationKey !== "string") throw new Error('Expecting String of merchantLocationKey');
    return callbackRequest(`${URI_SELL_EBAY}/location/${merchantLocationKey}/enable`, 'POST');
};

/**
 * This call retrieves all defined details of the inventory location that is specified by the merchantLocationKey path parameter.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/getInventoryLocation
 * @param merchantLocationKey {string}
 * @returns {Promise<{object}>}
 */
const getInventoryLocation = function (merchantLocationKey) {
    if (!merchantLocationKey) throw new Error('Error merchantLocationKey is required');
    if (typeof merchantLocationKey !== "string") throw new Error('Expecting String of merchantLocationKey');
    return callbackRequest(`${URI_SELL_EBAY}/location/${merchantLocationKey}`, 'GET', false);
};

/**
 * This call retrieves all defined details for every inventory location associated with the seller's account. There are no required parameters for this call and no request payload. However, there are two optional query parameters, limit and offset. The limit query parameter sets the maximum number of inventory locations returned on one page of data, and the offset query parameter specifies the page of data to return. These query parameters are discussed more in the URI parameters table below.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/getInventoryLocations
 * @param offset {string}
 * @param limit {string}
 * @returns {Promise<{object}>}
 */
const getInventoryLocations = function (offset = null, limit = null) {
    let queryString = '';
    if (offset || limit){
        let filters = {}
        if (offset) filters['offset'] = offset;
        if (limit) filters['limit'] = limit;
        queryString = makeString(filters, { quotes: 'no', braces: 'false', seperator: '&', assignment: '=' });
    }
    return callbackRequest(`${URI_SELL_EBAY}/location?${queryString}`, 'GET', false);
};

/**
 * Use this call to update non-physical location details for an existing inventory location. Specify the inventory location you want to update using the merchantLocationKey path parameter.
 * @link https://developer.ebay.com/api-docs/sell/inventory/resources/location/methods/updateInventoryLocation
 * @param merchantLocationKey {string}
 * @param params {object}
 * @returns {Promise<{object}>}
 */
const updateInventoryLocation = function (merchantLocationKey, params) {
    if (!params) throw new Error('Error params is required');
    if (typeof params !== 'object') throw new Error('Expecting object in params');
    if (!params.operatingHours.dayOfWeekEnum) throw new Error('Error operatingHours.dayOfWeekEnum is required');
    if (!params.operatingHours.intervals) throw new Error('Error operatingHours.intervals is required');
    if (!params.operatingHours.intervals.close) throw new Error('Error operatingHours.intervals.close is required');
    if (!params.operatingHours.intervals.open) throw new Error('Error operatingHours.intervals.open is required');
    if (!params.specialHours.intervals) throw new Error('Error specialHours.intervals is required');
    if (!params.specialHours.intervals.close) throw new Error('Error specialHours.intervals.close is required');
    if (!params.specialHours.intervals.open) throw new Error('Error specialHours.intervals.open is required');
    if (!merchantLocationKey) throw new Error('Error merchantLocationKey is required');
    if (typeof merchantLocationKey !== "string") throw new Error('Expecting String of merchantLocationKey');
    return callbackRequest(`${URI_SELL_EBAY}/location/${merchantLocationKey}/update_location_details`, 'POST');
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
    bulkCreateOffer,
    bulkPublishOffer,
    withdrawOffer,
    createOrReplaceInventoryItemGroup,
    getInventoryItemGroup,
    deleteInventoryItemGroup,
    bulkMigrateListing,
    createInventoryLocation,
    deleteInventoryLocation,
    disableInventoryLocation,
    enableInventoryLocation,
    getInventoryLocation,
    getInventoryLocations,
    updateInventoryLocation
};
