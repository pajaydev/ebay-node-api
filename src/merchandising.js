'use strict';

const { getRequest } = require('./request');
const { BASE_SVC_URL, MERCH_SRVC_NAME } = require('./constants');

//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples

/**
  * @method getMostWatchedItems {Function}
  * Add interest and excitement for buyers by showing them what other people are watching.
  * @param {String} categoryId (optional)
  */
async function getMostWatchedItems(categoryId) {
    console.log(this.options);
    if (!this.options.clientID) throw new Error("Missing App id or client id");
    return getRequest(`http://${BASE_SVC_URL}/${MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = {
    getMostWatchedItems
}