'use strict';

const { getRequest } = require('./request');
const { MERCH_SRVC_NAME } = require('./constants');

//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples

/**
  * @method getMostWatchedItems {Function}
  * Add interest and excitement for buyers by showing them what other people are watching.
  * @param {String} categoryId (optional)
  */
const getMostWatchedItems = function (merchOptions) {
    if (!this.options.clientID) throw new Error('Missing App id or client id');
    let url = '';
    if (merchOptions && merchOptions.categoryId !== undefined) url = `&categoryId=${merchOptions.categoryId}`;
    if (merchOptions && merchOptions.maxResults) url = `&maxResults=${merchOptions.maxResults}`;
    return getRequest(`http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error);
    });
};


/**
  * @method getSimilarItems {Function}
  * Gets similar Items based on the Item id provided.
  * @param {String} categoryId (optional)
  */
const getSimilarItems = function (merchOptions) {
    if (!this.options.clientID) throw new Error('Missing App id or client id');
    let url = '';
    if (merchOptions && merchOptions.itemId) url = `&itemId=${merchOptions.itemId}`;
    if (merchOptions && merchOptions.maxResults) url = `${url}&maxResults=${merchOptions.maxResults}`;
    return getRequest(`http://${this.options.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = {
    getMostWatchedItems,
    getSimilarItems
};
