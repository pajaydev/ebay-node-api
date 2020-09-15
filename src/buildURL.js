'use strict';

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
        let baseUrl = `https://${options.baseSvcUrl}/services/search/FindingService/v1?`;
        baseUrl += 'SECURITY-APPNAME=' + options.clientID;
        baseUrl += '&OPERATION-NAME=' + options.operationName;
        baseUrl += '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON';
        baseUrl += options.param ? '&' + options.param + '=' + options.name : '';
        baseUrl += options.additionalParam ? '&' + options.additionalParam : '';
        baseUrl += options.sortOrder ? '&sortOrder=' + options.sortOrder : '';
        baseUrl += '&outputSelector(0)=SellerInfo&outputSelector(1)=PictureURLLarge&outputSelector(2)=PictureURLSuperSize';
        baseUrl += options.limit ? '&paginationInput.entriesPerPage=' + options.limit : '';
        baseUrl += options.globalID ? '&GLOBAL-ID=' + options.globalID : '';
        baseUrl += options.pageNumber ? '&paginationInput.pageNumber=' + options.pageNumber : '';
        return baseUrl;
    },

    /**
   * Builds the Shopping(open api)  URL.
   *
   * @param {Object} options
   * @return {String} url
   * @private
   */
    buildShoppingUrl(options, operationName) {
        let baseUrl = `https://${options.baseUrl}/Shopping?`;
        baseUrl += `appid=${options.clientID}`;
        baseUrl += `&callname=${operationName}`;
        baseUrl += `&version=967&siteid=${options.siteId || 0}&responseencoding=JSON`;
        baseUrl += options.includeSelector ? '&IncludeSelector=' + options.includeSelector : '';
        return baseUrl;
    }

};

module.exports = buildURL;

