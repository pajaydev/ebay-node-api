'use strict';

const axios = require('axios');
const xmlParser = require('xml2json');
const { parseObj } = require('./common-utils/index');
const { DEALS_BASE_URL } = require('./constants');

module.exports = {

    /**
        * @method getDeals {Function}
        * Add interest and excitement for buyers by showing them what other people are watching.
        * @param {String} categoryId (optional)
    */
    getDeals: async function (options) {
        if (!this.options.clientID) throw new Error('Missing App id or client id');
        if (!options) options = {};
        const countryCode = options.countryCode ? options.countryCode : this.options.globalID;
        const qs = parseObj(options);
        const response = await axios.get(`${DEALS_BASE_URL}${countryCode}?${qs}`);
        return response.data;
    }
};
