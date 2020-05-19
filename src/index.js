'use strict';

const qs = require('querystring');
const ebayBuyApi = require('./buy-api');
const shoppingApi = require('./shopping');
const { getDefaultCategoryTreeId,
    getCategoryTree,
    getCategorySubtree,
    getCategorySuggestions,
    getItemAspectsForCategory 
} = require('./taxonomy-api');
const ebayFindingApi = require('./findingApi');
const { getSimilarItems, getMostWatchedItems } = require('./merchandising');
const { getSiteId, base64Encode } = require('./utils');
const { postRequest } = require('./request');
const { PROD_OAUTHENVIRONMENT_WEBENDPOINT,
        SANDBOX_OAUTHENVIRONMENT_WEBENDPOINT,
        PROD_BASE_URL, SANDBOX_BASE_URL,
        BASE_SANDBX_SVC_URL,
        BASE_SVC_URL, CLIENT_CRED_SCOPE
} = require('./constants');
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';

/**
 * Creates a eBay instance.
 *
 * @param {Object} options configuration options - required
 * @param {String} options.clientID eBay Client/App ID - required
 * @param {String} options.clientSecret eBay Secret/Cert ID - required for user access tokens
 * @param {String} options.redirectUri redirect URI after user gives consent - required for authorization code flow
 * @param {String} options.headers HTTP request headers
 * @param {String} options.environment eBay API Environment, defaults to PROD (Production)
 * @param {String} options.countryCode eBay specific country site, defaults to EBAY-US
 * @constructor
 * @public
 */

function Ebay(options) {
    if (!options) throw new Error('Options is missing, please provide the input');
    if (!options.clientID) throw Error('Client ID is Missing\nCheck documentation to get Client ID http://developer.ebay.com/DevZone/account/');
    if (!(this instanceof Ebay)) return new Ebay(options);
    if (options.environment === SANDBOX_ENV) {
        this.environment = SANDBOX_ENV;
        this.baseUrl = SANDBOX_BASE_URL;
        this.baseSvcUrl = BASE_SANDBX_SVC_URL;
        this.oauthEndpoint = SANDBOX_OAUTHENVIRONMENT_WEBENDPOINT;
    } else {
        this.environment = PROD_ENV;
        this.baseUrl = PROD_BASE_URL;
        this.baseSvcUrl = BASE_SVC_URL;
        this.oauthEndpoint = PROD_OAUTHENVIRONMENT_WEBENDPOINT;
    }
    // Assign the credentials
    this.credentials = {
        clientID: options.clientID,
        clientSecret: options.clientSecret
    };
    // Set the headers
    this.headers = options.headers;
    this.globalID = options.countryCode || 'EBAY-US';
    this.siteID = getSiteId(this.globalID);
}

/**
* Generates an application access token for client credentials grant flow
*
* @param scopes array of scopes for the access token
* @return appAccessToken object
*/
const getApplicationToken = function (scopes = CLIENT_CRED_SCOPE) {
    if (!this.credentials) throw new Error('Credentials are required');
    scopes = Array.isArray(scopes) ? scopes.join('%20') : scopes;
    const data = qs.stringify({
        grant_type: 'client_credentials',
        scope: scopes
    });
    const encodedStr = base64Encode(`${this.credentials.clientID}:${this.credentials.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return postRequest(this, 'application/x-www-form-urlencoded', data, '/identity/v1/oauth2/token', auth).then(result => {
        return JSON.parse(result);
    });
}

/**
 * Generates user consent authorization url
 * 
 * @param scopes array of scopes for the access token
 * @param state custom state value
 * @return userConsentUrl
*/
const getUserAuthorizationUrl = function (scopes, state = null) {
    if (!scopes) throw new Error('Scopes parameter is required');
    if (!this.credentials) throw new Error('Credentials are required');
    if (!this.credentials.redirectUri) throw new Error('redirect_uri is required for redirection after sign in\nkindly check here https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html');
    let scopesParam = Array.isArray(scopes) ? scopes.join('%20') : scopes;
    let queryParam = `client_id=${this.credentials.clientID}`;
    queryParam = `${queryParam}&redirect_uri=${this.credentials.redirectUri}`;
    queryParam = `${queryParam}&response_type=code`;
    queryParam = `${queryParam}&scope=${scopesParam}`;
    queryParam = state ? `${queryParam}&state=${state}` : queryParam;
    return `${this.oauthEndpoint}?${queryParam}`;
}

/**
 * Generates a User access token given auth code
 * 
 * @param environment Environment (production/sandbox).
 * @param code code generated from browser using the method generateUserAuthorizationUrl.
 * @return userAccessToken object.
*/
const getAccessTokenByCode = function (code) {
    if (!code) throw new Error('Authorization code is required');
    if (!this.credentials) throw new Error('Credentials are required');
    const data = qs.stringify({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: this.credentials.redirectUri
    });
    const encodedStr = base64Encode(`${this.credentials.clientID}:${this.credentials.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return postRequest(this, 'application/x-www-form-urlencoded', data, '/identity/v1/oauth2/token', auth).then(result => {
        return JSON.parse(result);
    });;
}

/**
 * Use a refresh token to update a User access token (Updating the expired access token)
 * 
 * @param refreshToken refresh token, defaults to pre-assigned refresh token
 * @param scopes array of scopes for the access token
 * @return userAccessToken object
*/
const getAccessTokenByRefresh = function (refreshToken = null, scopes) {
    refreshToken = refreshToken ? refreshToken : this.refreshToken;
    if (!scopes) throw new Error('Scopes parameter is required');
    if (!this.credentials) throw new Error('Credentials are required');
    let scopesParam = Array.isArray(scopes) ? scopes.join('%20') : scopes;
    if (!token) {
        throw new Error('Refresh token is required, to generate refresh token use exchangeCodeForAccessToken method'); // eslint-disable-line max-len
    }
    const data = qs.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: scopesParam
    });
    const encodedStr = base64Encode(`${this.credentials.clientID}:${this.credentials.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return postRequest(this, 'application/x-www-form-urlencoded', data, '/identity/v1/oauth2/token', auth).then(result => {
        return JSON.parse(result);
    });
}

/**
 * Assign user access token and refresh token returned from authorization grant workflow (i.e getAccessTokenByCode)
 * 
 * @param userAccessToken userAccessToken obj returned from getAccessTokenByCode or getAccessTokenByRefresh
*/
const setUserAccessTokens = function (userAccessToken) {
    if (!userAccessToken.token_type == 'User Access Token') throw new Error('userAccessToken is either missing or invalid');
    this.refreshToken = userAccessToken.refresh_token;
    this.userAccessToken = userAccessToken.access_token;
}

/**
 * Assign application access token returned from client credentials workflow (i.e getApplicationToken)
 * 
 * @param appAccessToken userAccessToken obj returned from getApplicationToken
*/
const setAppAccessToken = function (appAccessToken) {
    if (!appAccessToken.token_type == 'Application Access Token') throw new Error('appAccessToken is either missing or invalid');
    this.appAccessToken = appAccessToken.access_token;
}

const getRefreshToken = function () {
    return this.refreshToken;
} 
const getUserAccessToken = function () {
    return this.userAccessToken;
}
const getAppAccessToken = function () {
    return this.appAccessToken;
}

Ebay.prototype = {
    getApplicationToken,
    getUserAuthorizationUrl,
    getAccessTokenByCode,
    getAccessTokenByRefresh,
    setAppAccessToken,
    setUserAccessTokens,
    getRefreshToken,
    getUserAccessToken,
    getAppAccessToken,
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
