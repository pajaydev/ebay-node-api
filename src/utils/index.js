'use strict';

const {
    base64Encode,
    getSiteId,
    upperCase,
    isString,
    isEmptyObj,
} = require('./general');
const { buildSearchUrl, buildShoppingUrl } = require('./buildURL');
const { urlParseObj, encodeURLQuery } = require('./URLQuery');

module.exports = {
    base64Encode,
    getSiteId,
    upperCase,
    isString,
    isEmptyObj,
    buildSearchUrl,
    buildShoppingUrl,
    urlParseObj,
    encodeURLQuery
};
