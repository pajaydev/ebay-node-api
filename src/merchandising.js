'use strict';

const { getRequest } = require('./request');
const { BASE_SVC_URL, MERCH_SRVC_NAME } = require('./constants');

//https://developer.ebay.com/devzone/merchandising/docs/CallRef/getMostWatchedItems.html#Samples

/**
  * @method getMostWatchedItems {Function}
  * Add interest and excitement for buyers by showing them what other people are watching.
  * @param {String} categoryId (optional)
  */
async function getMostWatchedItems(merchOptions) {
    if (!this.options.clientID) throw new Error("Missing App id or client id");
    let url = '';
    if (merchOptions && merchOptions.categoryId != undefined) url = `&categoryId=${merchOptions.categoryId}`;
    if (merchOptions && merchOptions.maxResults) url = `&maxResults=${merchOptions.maxResults}`;
    return getRequest(`http://${BASE_SVC_URL}/${MERCH_SRVC_NAME}?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=${MERCH_SRVC_NAME}&SERVICE-VERSION=1.1.0&CONSUMER-ID=${this.options.clientID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD${url}`).then((result) => {
        return JSON.parse(result);
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = {
    getMostWatchedItems
}