//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
let makeRequest = require('./request');
let urlObject = require('./buildURL');

function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, please provide the input");
    if (!options.clientID) throw Error("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    this.options = options;
    this.options.globalID = options.countryCode || "EBAY-US";
    this.options.keyword = "iphone";
}

Ebay.prototype = {

    findItemsByKeywords: function (keyword) {
        this.options.name = keyword;
        this.options.operationName = "findItemsByKeywords";
        this.options.param = "keywords";
        let url = urlObject.buildSearchUrl(this.options);
        console.log(url);
        return makeRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result["findItemsByKeywordsResponse"];

        }, (error) => {
            console.log(error);
        })

    },

    findItemsByCategory: function (categoryID) {
        if (!categoryID) throw new Error("Category ID is null or invalid");
        this.options.name = categoryID;
        this.options.operationName = "findItemsByCategory";
        this.options.param = "categoryId";
        let url = urlObject.buildSearchUrl(this.options);
        console.log(url);
        return makeRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result["findItemsByCategoryResponse"];

        }, (error) => {
            console.log(error);
        })

    },

    getAllCategories: function (categoryID) {
        //console.log(url);
        this.options.name = categoryID ? categoryID : -1;
        this.options.operationName = "findItemsByKeywords";
        this.options.param = "CategoryID";
        let url = urlObject.buildShoppingUrl(this.options);
        console.log(url);
        return makeRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result;
        }, (error) => {
            console.log(error);
        })
    },

    getVersion: function () {
        //this.options.name = categoryID ? categoryID : -1;
        this.options.operationName = "getVersion";
        //this.options.param = "CategoryID";
        let url = urlObject.buildSearchUrl(this.options);
        return makeRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result["getVersionResponse"][0];
        }, (error) => {
            console.log(error);
        })
    }

};

module.exports = Ebay;
