'use strict';

const { getRequest } = require('./request');
const { urlParseObj } = require('./utils');
const { MERCH_SRVC_NAME } = require('./constants');

//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples

/**
  * @method getMostWatchedItems {Function}
  * Add interest and excitement for buyers by showing them what other people are watching.
  * @param {String} categoryId (optional)
  */
const getMostWatchedItems = merchOptions => {
    if (!this.credentials.clientID) throw new Error('Missing App id or client id');
    const url = urlParseObj(merchOptions);
    return getRequest(`http://${this.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.credentials.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
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
const getSimilarItems = merchOptions => {
    if (!this.credentials.clientID) throw new Error('Missing App id or client id');
    const url = urlParseObj(merchOptions);
    return getRequest(`http://${this.baseSvcUrl}/${MERCH_SRVC_NAME}?OPERATION-NAME=getSimilarItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.credentials.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error); // eslint-disable-line no-console
    });
};

module.exports = {
    getMostWatchedItems,
    getSimilarItems
};
