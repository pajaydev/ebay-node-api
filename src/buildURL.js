/**
 * This method is used to build the url based on 
 * the type of request.
 */

const buildURL = {
    /**
   * Builds the findings(search)  URL.
   *
   * @param {Object} options
   * @param {String} data
   * @return {String} build url
   * @private
   */
    buildSearchUrl(options) {
        let base_url = "http://svcs.ebay.com/services/search/FindingService/v1?";
        base_url += "SECURITY-APPNAME=" + options.clientID;
        base_url += "&OPERATION-NAME=" + options.operationName;
        base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&";
        base_url += options.param + "=" + options.name;
        base_url += "&paginationInput.entriesPerPage=" + options.limit;
        base_url += "&GLOBAL-ID=" + options.globalID;

        return base_url;
    },

    /**
   * Builds the Shopping(open api)  URL.
   *
   * @param {String} param
   * @param {String} data
   * @return {String} build url
   * @private
   */
    buildShoppingUrl(options) {
        let base_url = "http://open.api.ebay.com/Shopping?";
        base_url += "SECURITY-APPNAME=" + options.clientID;
        base_url += "&OPERATION-NAME=" + options.operationName;
        base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&";
        base_url += options.param + "=" + options.name;
        base_url += "&paginationInput.entriesPerPage=" + options.limit;
        //base_url += "&GLOBAL-ID=" + oglobalID;
        return base_url;
    }
};

module.exports = buildURL;

