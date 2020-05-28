'use strict';
const qs = require('querystring');
const ebayBuyApi = require('./buy-api');
const shoppingApi = require('./shopping');
const taxonomyApi = require('./taxonomy-api');
const ebayFindingApi = require('./finding');
const commonUtils = require('./common-utils');
const { getSimilarItems, getMostWatchedItems } = require('./merchandising');
const { makeRequest } = require('./request');
const {
    PROD_OAUTHENVIRONMENT_WEBENDPOINT,
    SANDBOX_OAUTHENVIRONMENT_WEBENDPOINT,
    PROD_BASE_URL,
    SANDBOX_BASE_URL,
    BASE_SANDBX_SVC_URL,
    BASE_SVC_URL
} = require('./constants');
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';
const DEFAULT_API_SCOPE = 'https://api.ebay.com/oauth/api_scope';


/**
 * Creates a eBay instance.
 *
 * @param {Object} options configuration options
 * @param {String} options.clientID Client Id/App id
 * @param {String} options.clientSecret eBay Secret/Cert ID - required for user access tokens
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
    options.oauthEndpoint = PROD_OAUTHENVIRONMENT_WEBENDPOINT;
    // handle sandbox env.
    if (options.env === SANDBOX_ENV) {
        options.baseUrl = SANDBOX_BASE_URL;
        options.baseSvcUrl = BASE_SANDBX_SVC_URL;
        options.oauthEndpoint = SANDBOX_OAUTHENVIRONMENT_WEBENDPOINT;
    }
    this.options = options;
    commonUtils.setHeaders(this, options.headers);
    this.options.globalID = options.countryCode || 'EBAY-US';
    this.options.siteId = options.siteId || '0';
}

/**
* Generates an application access token for client credentials grant flow
*
* @return appAccessToken object
*/
const getAccessToken = function () {
    if (!this.options.clientID) throw new Error('Missing Client ID');
    if (!this.options.clientSecret) throw new Error('Missing Client Secret or Cert Id');
    if (!this.options.body) throw new Error('Missing Body, required Grant type');    
    let scopesParam = this.options.body.scopes
        ? Array.isArray(this.options.body.scopes)
            ? this.options.body.scopes.join('%20')
            : this.options.body.scopes
        : DEFAULT_API_SCOPE;
    this.options.data = qs.stringify({
        grant_type: 'client_credentials',
        scope: scopesParam
    });
    this.options.contentType = 'application/x-www-form-urlencoded';
    const self = this;
    const encodedStr = commonUtils.base64Encode(this.options.clientID + ':' + this.options.clientSecret);
    const auth = 'Basic ' + encodedStr;
    return makeRequest(this.options, '/identity/v1/oauth2/token', 'POST', auth).then((result) => {
        const resultJSON = JSON.parse(result);
        if (!resultJSON.error) self.setAppAccessToken(resultJSON);
        return resultJSON;
    });
};

/**
 * Generates user consent authorization url
 *
 * @param state custom state value
 * @return userConsentUrl
*/
const getUserAuthorizationUrl = function (state = null) {
    if (!this.options.clientID) throw new Error('Missing Client ID');
    if (!this.options.clientSecret) throw new Error('Missing Client Secret or Cert Id');
    if (!this.options.body) throw new Error('Missing Body, required Grant type');
    if (!this.options.redirectUri) throw new Error('redirect_uri is required for redirection after sign in\nkindly check here https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html');
    let scopesParam = this.options.body.scopes
        ? Array.isArray(this.options.body.scopes)
            ? this.options.body.scopes.join('%20')
            : this.options.body.scopes
        : DEFAULT_API_SCOPE;
    let queryParam = `client_id=${this.options.clientID}`;
    queryParam += `&redirect_uri=${this.options.redirectUri}`;
    queryParam += `&response_type=code`;
    queryParam += `&scope=${scopesParam}`;
    queryParam += state ? `&state=${state}` : '';
    return `${this.options.oauthEndpoint}?${queryParam}`;
};

/**
 * Generates a User access token given auth code
 *
 * @param code code generated from browser using the method getUserAuthorizationUrl
 * @return userAccessToken object (with refresh_token)
*/
const getUserTokenByCode = function (code) {
    if (!code) throw new Error('Authorization code is required, to generate authorization code use getUserAuthorizationUrl method');
    if (!this.options.clientID) throw new Error('Missing Client ID');
    if (!this.options.clientSecret) throw new Error('Missing Client Secret or Cert Id');
    if (!this.options.redirectUri) throw new Error('redirect_uri is required for redirection after sign in\nkindly check here https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html');
    this.options.data = qs.stringify({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: this.options.redirectUri
    });
    this.options.contentType = 'application/x-www-form-urlencoded';
    const self = this;
    const encodedStr = commonUtils.base64Encode(`${this.options.clientID}:${this.options.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return makeRequest(this.options, '/identity/v1/oauth2/token', 'POST', auth).then(result => {
        const resultJSON = JSON.parse(result);
        if (!resultJSON.error) self.setUserAccessToken(resultJSON);
        return resultJSON;
    });
};

/**
 * Use a refresh token to update a User access token (Updating the expired access token)
 *
 * @param refreshToken refresh token, defaults to pre-assigned refresh token
 * @param scopes array of scopes for the access token
 * @return userAccessToken object (without refresh_token)
*/
const getUserTokenByRefresh = function (refreshToken = null) {
    if (!this.options.clientID) throw new Error('Missing Client ID');
    if (!this.options.clientSecret) throw new Error('Missing Client Secret or Cert Id');
    if (!this.options.body) throw new Error('Missing Body, required Grant type');
    if (!refreshToken && !this.options.refreshToken) {
        throw new Error('Refresh token is required, to generate refresh token use getUserTokenByCode method'); // eslint-disable-line max-len
    }
    refreshToken = refreshToken ? refreshToken : this.options.refreshToken;
    let scopesParam = this.options.body.scopes
        ? Array.isArray(this.options.body.scopes)
            ? this.options.body.scopes.join('%20')
            : this.options.body.scopes
        : DEFAULT_API_SCOPE;
    this.options.data = qs.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: scopesParam
    });
    this.options.contentType = 'application/x-www-form-urlencoded';
    const self = this;
    const encodedStr = commonUtils.base64Encode(`${this.options.clientID}:${this.options.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return makeRequest(this.options, '/identity/v1/oauth2/token', 'POST', auth).then(result => {
        const resultJSON = JSON.parse(result);
        if (!resultJSON.error) self.setUserAccessToken(resultJSON);
        return resultJSON;
    });
};

/**
 * Assign user access token and refresh token returned from authorization grant workflow (i.e getUserTokenByRefresh)
 *
 * @param userAccessToken userAccessToken obj returned from getUserTokenByCode or getAccessTokenByRefresh
*/
const setUserAccessToken = function (userAccessToken) {
    if (!userAccessToken.token_type === 'User Access Token') throw new Error('userAccessToken is either missing or invalid');
    if (userAccessToken.refresh_token) this.options.refreshToken = userAccessToken.refresh_token;
    this.options.userAccessToken = userAccessToken.access_token;
};

/**
 * Assign application access token returned from client credentials workflow (i.e getAccessToken)
 *
 * @param appAccessToken appAccessToken obj returned from getApplicationToken
*/
const setAppAccessToken = function (appAccessToken) {
    if (!appAccessToken.token_type === 'Application Access Token') throw new Error('appAccessToken is either missing or invalid');
    this.options.appAccessToken = appAccessToken.access_token;
};

Ebay.prototype = {
    getAccessToken,
    getUserAuthorizationUrl,
    getUserTokenByCode,
    getUserTokenByRefresh,
    setUserAccessToken,
    setAppAccessToken,
    getMostWatchedItems,
    getSimilarItems,
    ...commonUtils,
    ...shoppingApi,
    ...ebayBuyApi,
    ...taxonomyApi,
    ...ebayFindingApi
};

module.exports = Ebay;
