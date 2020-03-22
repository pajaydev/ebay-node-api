'use strict';

const { getRequest } = require('./request');
const { parseObj } = require('./common-utils/index');
const { MERCH_SRVC_NAME } = require('./constants');

//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples

/**
  * @method getMostWatchedItems {Function}
  * Add interest and excitement for buyers by showing them what other people are watching.
  * @param {String} categoryId (optional)
  */
const getMostWatchedItems = function (merchOptions) {
    if (!this.options.clientID) throw new Error('Missing App id or client id');
    const url = parseObj(merchOptions);
    return getRequest(`http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error); // eslint-disable-line no-console
    });
};


/**
  * @method getSimilarItems {Function}
  * Gets similar Items based on the Item id provided.
  * @param {String} categoryId (optional)
  */
const getSimilarItems = function (merchOptions) {
    if (!this.options.clientID) throw new Error('Missing App id or client id');
    const url = parseObj(merchOptions);
    return getRequest(`http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error); // eslint-disable-line no-console
    });
};

module.exports = {
    getMostWatchedItems,
    getSimilarItems
};
