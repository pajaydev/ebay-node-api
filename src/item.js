'use strict';

const { makeRequest } = require('./request');

const createItemDraft = function (itemData) {
    if (!itemData) return new Error('INVALID_REQUEST_PARMS -> Required item data to create item draft');
    if (!this.options.userAccessToken) return new Error('INVALID_REQUEST_PARMS -> Authorization user token is required');
    const auth = 'Bearer ' + this.options.userAccessToken;
    this.options.contentType = 'application/json';
    this.options.body = JSON.stringify(itemData);
    return makeRequest(this.options, '/sell/listing/v1_beta/item_draft/', 'POST', auth).then((result) => {
        const resultJSON = JSON.parse(result);
        return resultJSON;
    }).catch((error) => {
        return new Error(error);
    });
};

module.exports = {
    createItemDraft
};
