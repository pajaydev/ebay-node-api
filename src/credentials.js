'use strict';
const qs = require('querystring');
const { base64Encode } = require('./common-utils');
const { makeRequest } = require('./request');
const { DEFAULT_BODY } = require('./constants');
const DEFAULT_API_SCOPE = 'https://api.ebay.com/oauth/api_scope';

/**
* Generates an application access token for client credentials grant flow
*
* @return appAccessToken object
*/
const getAccessToken = function () {
    if (!this.options.clientID) throw new Error('Missing Client ID');
    if (!this.options.clientSecret) throw new Error('Missing Client Secret or Cert Id');
    if (!this.options.body) {
        this.options.body = qs.stringify(DEFAULT_BODY);
    }
    else {
        const scopesParam = this.options.body.scopes
            ? Array.isArray(this.options.body.scopes)
                ? this.options.body.scopes.join('%20')
                : this.options.body.scopes
            : DEFAULT_API_SCOPE;
        this.options.body = qs.stringify({
            grant_type: 'client_credentials',
            scope: scopesParam
        });
    }
    this.options.contentType = 'application/x-www-form-urlencoded';
    const self = this;
    const encodedStr = base64Encode(this.options.clientID + ':' + this.options.clientSecret);
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
    const scopesParam = this.options.body.scope
        ? Array.isArray(this.options.body.scope)
            ? this.options.body.scope.join('%20')
            : this.options.body.scope
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
 * @param code code generated from browser using the method getUserAuthorizationUrl (should be urldecoded)
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
    const encodedStr = base64Encode(`${this.options.clientID}:${this.options.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return makeRequest(this.options, '/identity/v1/oauth2/token', 'POST', auth).then((result) => {
        const resultJSON = JSON.parse(result);
        if (!resultJSON.error) self.setUserAccessToken(resultJSON);
        return resultJSON;
    });
};

/**
 * Use a refresh token to update a User access token (Updating the expired access token)
 *
 * @param refreshToken refresh token, defaults to pre-assigned refresh token
 * @param scope array of scopes for the access token
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
    const scopesParam = this.options.body.scope
        ? Array.isArray(this.options.body.scope)
            ? this.options.body.scope.join('%20')
            : this.options.body.scope
        : DEFAULT_API_SCOPE;
    this.options.data = qs.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: scopesParam
    });
    this.options.contentType = 'application/x-www-form-urlencoded';
    const self = this;
    const encodedStr = base64Encode(`${this.options.clientID}:${this.options.clientSecret}`);
    const auth = `Basic ${encodedStr}`;
    return makeRequest(this.options, '/identity/v1/oauth2/token', 'POST', auth).then((result) => {
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

module.exports = {
    getAccessToken,
    getUserAuthorizationUrl,
    getUserTokenByCode,
    getUserTokenByRefresh,
    setUserAccessToken,
    setAppAccessToken
};
