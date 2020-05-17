'use strict';
const ebayBuyApi = require('./buy-api');
const shoppingApi = require('./shopping');
const { getDefaultCategoryTreeId,
    getCategoryTree,
    getCategorySubtree,
    getCategorySuggestions,
    getItemAspectsForCategory } = require('./taxonomy-api');
const ebayFindingApi = require('./findingApi');
const { setAccessToken,
    _getAccessToken,
    setHeaders,
    getHeaders
} = require('./common-utils');
const { getSimilarItems, getMostWatchedItems } = require('./merchandising');
const { PROD_BASE_URL, SANDBOX_BASE_URL, BASE_SANDBX_SVC_URL, BASE_SVC_URL } = require('./constants');
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';


/**
 * Creates a eBay instance.
 *
 * @param {Object} options configuration options
 * @param {String} options.clientID Client Id/App id
 * @param {String} options.env Environment, defaults to PROD
 * @param {String} options.headers HTTP request headers
 * @constructor
 * @public
 */



function Ebay(options) {
    if (!options) throw new Error('Options is missing, please provide the input');
    if (!options.clientID) throw Error('Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/');
    if (!(this instanceof Ebay)) return new Ebay(options);
    if (!options.env) options.env = PROD_ENV;
    options.baseUrl = PROD_BASE_URL;
    options.baseSvcUrl = BASE_SVC_URL;
    // handle sandbox env.
    if (options.env === SANDBOX_ENV) {
        options.baseUrl = SANDBOX_BASE_URL;
        options.baseSvcUrl = BASE_SANDBX_SVC_URL;
    }
    this.options = options;
    setHeaders(this, options.headers);
    this.options.globalID = options.countryCode || 'EBAY-US';
    this.options.siteId = options.siteId || '0';
    this.getAccessToken = memoize(this._getAccessToken, { maxAge: 7200, key: this.clientID });
}

Ebay.prototype = {
    setAccessToken,
    _getAccessToken,
    setHeaders,
    getHeaders,
    getDefaultCategoryTreeId,
    getCategoryTree,
    getCategorySubtree,
    getCategorySuggestions,
    getItemAspectsForCategory,
    getMostWatchedItems,
    getSimilarItems,
    ...shoppingApi,
    ...ebayBuyApi,
    ...ebayFindingApi
};

module.exports = Ebay;
