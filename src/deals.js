'use strict';
/* eslint-disable indent */
const axios = require('axios');
const { parseObj } = require('./common-utils/index');
const { DEALS_BASE_URL } = require('./constants');

module.exports = {

  /**
   * @deprecated will be removed in a future major version.
   * @method getDeals {Function}
   * get deals based on site, category across ebay like (Today's top ten deals)
   * @param {Object} options (optional)
   */
  getDeals: async function (options) {
    if (!this.options.clientID) throw new Error('Missing App id or client id');
    if (!options) options = {};
    const countryCode = options.countryCode
      ? options.countryCode
      : this.options.globalID;
    const qs = parseObj(options);
    const response = await axios.get(`${DEALS_BASE_URL}${countryCode}?${qs}`);
    return response.data;
  }
};
