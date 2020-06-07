'use strict';
const { makeRequest } = require('../request');

const base64Encode = (encodeData) => {
    const buff = Buffer.from(encodeData);;
    return buff.toString('base64');
};

const isString = (value)=>{
    return typeof value === 'string' || value instanceof String;
}

/**
 * Constructs query param based on some logic to support filter and aspect_filter params.
 * output will be keywords=iphone&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&itemFilter(2).name=SoldItemsOnly&itemFilter(2).value=true
 * @param {Object} options
 */
const constructAdditionalParams = (options) => {
    let params = '';
    let count = 0;
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            if (key === 'entriesPerPage' || key === 'pageNumber') {
                params = `${params}paginationInput.${key}=${options[key]}&`;
            }
            else if (key === 'keywords' || key === 'categoryId' || key === 'productId' || key === 'sortOrder' || key === 'storeName') {
                const encodeParam = encodeURIComponent(options[key]);
                params = `${params}${key}=${encodeParam}&`;
            }
            else if (key === 'affiliate') {
                const innerParams = options[key];
                for (let innerKey in innerParams) {
                    params = `${params}${key}.${innerKey}=${innerParams[innerKey]}&`;
                }
            }
            else {
                params = `${params}itemFilter(${count}).name=${key}&
                itemFilter(${count}).value=${options[key]}&`;
                count += 1;
            }
        }
    }
    // replace extra space
    params = params.replace(/\s/g, '');
    return params.substring(0, params.length - 1);
};

module.exports = {
    setAccessToken: function (token) {
        this.options.access_token = token;
    },
    getAccessToken: function () {
        if (!this.options.clientID) throw new Error('Missing Client ID');
        if (!this.options.clientSecret) throw new Error('Missing Client Secret or Cert Id');
        if (!this.options.body) throw new Error('Missing Body, required Grant type');
        const encodedStr = base64Encode(this.options.clientID + ':' + this.options.clientSecret);
        const self = this;
        const auth = 'Basic ' + encodedStr;
        this.options.contentType = 'application/x-www-form-urlencoded';
        return makeRequest(this.options, '/identity/v1/oauth2/token', 'POST', auth).then((result) => {
            const resultJSON = JSON.parse(result);
            self.setAccessToken(resultJSON.access_token);
            return resultJSON;
        });
    },
    setSiteId: function (siteId) {
        this.options.siteId = siteId;
    },
    setHeaders(self, headerObj) {
        self.headers = Object.assign({}, self.headers, headerObj);
    },
    upperCase(data) {
        if (!isString(data)) data = data.toString();
        return data.toUpperCase();
    },

    // Returns if a value is a string
    isString,

    // Returns if object is empty or not
    isEmptyObj(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },

    encodeURLQuery(url) {
        return encodeURIComponent(url).replace(/'/g, '%27').replace(/"/g, '%22');
    },

    // parses the object and converts it into query params.
    parseObj(options, url = '') {
        if (options) {
            for (let key in options) {
                url = `${url}&${key}=${options[key]}`
            }
        }
        return url;
    },
    base64Encode,
    constructAdditionalParams
};