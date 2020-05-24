'use strict';

/**
 * Methods used to build the url based on
 * the type of request.
 */
module.exports = {
    buildSearchUrl: (self, options, operationName) => {
        let url = `https://${self.baseSvcUrl}/services/search/FindingService/v1?`;
        url += 'SECURITY-APPNAME=' + self.credentials.clientID;
        url += '&OPERATION-NAME=' + operationName;
        url += '&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON';
        url += options.param ? '&' + options.param + '=' + options.name : '';
        url += options.additionalParam ? '&' + options.additionalParam : '';
        url += options.sortOrder ? '&sortOrder=' + options.sortOrder : '';
        url += '&outputSelector(0)=SellerInfo';
        url += '&outputSelector(1)=PictureURLLarge';
        url += options.limit ? '&paginationInput.entriesPerPage=' + options.limit : '';
        url += self.globalID ? '&GLOBAL-ID=' + self.globalID : '';
        url += options.pageNumber ? '&paginationInput.pageNumber=' + options.pageNumber : '';
        return url;
    },
    buildShoppingUrl: (self, operationName, includeSelector = null) => {
        let url = `https://${self.baseUrl}/Shopping?`;
        url += `appid=${self.credentials.clientID}`;
        url += `&callname=${operationName}`;
        url += `&version=967&siteid=${self.siteID || 0}&responseencoding=JSON`;
        url += includeSelector ? `&IncludeSelector=${includeSelector}` : '';
        return url;
    }
};

