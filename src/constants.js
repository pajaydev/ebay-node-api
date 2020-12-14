'use strict';

const body = {
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope'
};

module.exports = {
    PROD_OAUTHENVIRONMENT_WEBENDPOINT: 'https://auth.ebay.com/oauth2/authorize',
    SANDBOX_OAUTHENVIRONMENT_WEBENDPOINT: 'https://auth.sandbox.ebay.com/oauth2/authorize',
    DEALS_BASE_URL: 'http://www.ebay.com/rps/feed/v1.1/',
    PROD_BASE_URL: 'api.ebay.com',
    SANDBOX_BASE_URL: 'api.sandbox.ebay.com',
    BASE_SVC_URL: 'svcs.ebay.com',
    BASE_SANDBX_SVC_URL: 'svcs.sandbox.ebay.com',
    MERCH_SRVC_NAME: 'MerchandisingService',
    DEFAULT_BODY: body
};
