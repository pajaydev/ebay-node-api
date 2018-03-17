function ebayURL() {

}

ebayURL.prototype = {
    buildSearchUrl: function (param, data) {
        let base_url = "http://svcs.ebay.com/services/search/FindingService/v1?";
        base_url += "SECURITY-APPNAME=" + this.options.clientID;
        base_url += "&OPERATION-NAME=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
        base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON";
        base_url += "&callback=" + configData["findItemsByKeywords"]["callback"] + "&REST-PAYLOAD&";
        base_url += param + "=" + data;
        base_url += "&paginationInput.entriesPerPage=" + this.options.limit;
        base_url += "&GLOBAL-ID=" + this.options.globalID;

        return base_url;
    },

    buildShoppingUrl: function () {

    }
}

