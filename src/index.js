//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
let { getRequest, makeRequest, base64Encode } = require('./request');
let { getItem,
    getItemByLegacyId,
    getItemByItemGroup,
    searchItems } = require('./buy-api');
let urlObject = require('./buildURL');

function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, please provide the input");
    if (!options.clientID) throw Error("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    if (!(this instanceof Ebay)) return new Ebay(options);
    this.options = options;
    this.options.globalID = options.countryCode || "EBAY-US";
    this.options.keyword = "iphone";
}

Ebay.prototype = {

    findItemsByKeywords: function (keyword) {
        // console.log("keyword" + keyword);
        if (!keyword) throw new Error("Keyword is missing, Keyword is required");
        this.options.name = keyword;
        this.options.operationName = "findItemsByKeywords";
        this.options.param = "keywords";
        let url = urlObject.buildSearchUrl(this.options);
        console.log(url);
        return getRequest(url).then((data) => {
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
        return getRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result["findItemsByCategoryResponse"];

        }, (error) => {
            console.log(error);
        })

    },

    getAllCategories: function (categoryID) {
        //console.log(url);
        this.options.name = categoryID ? categoryID : -1;
        this.options.operationName = "GetCategoryInfo";
        this.options.param = "CategoryID";
        let url = urlObject.buildShoppingUrl(this.options);
        console.log(url);
        return getRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result;
        }, (error) => {
            console.log(error);
        })
    },

    getVersion: function () {
        this.options.operationName = "getVersion";
        let url = urlObject.buildSearchUrl(this.options);
        return getRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result["getVersionResponse"][0];
        }, (error) => {
            console.log(error);
        })
    },

    getUserDetails: function (userID) {
        if (!userID) throw new Error("User ID is null or invalid");
        this.options.operationName = "GetUserProfile";
        this.options.param = "UserID";
        this.options.name = userID;
        this.options.includeSelector = this.options.details ? "Details" : null;
        let url = urlObject.buildShoppingUrl(this.options);
        console.log(url);
        return getRequest(url).then((data) => {
            let result = JSON.parse(data);
            console.log(result);
            return result;
        }, (error) => {
            console.log(error);
        })
    },
    setAccessToken: function (token) {

        this.options.access_token = token;
    },

    getAccessToken: function () {
        if (!this.options.clientID) throw new Error("Missing Client ID");
        if (!this.options.clientSecret) throw new Error("Missing Client Secret or Cert Id");
        if (!this.options.body) throw new Error("Missing Body, required Grant type");
        const encodedStr = base64Encode(this.options.clientID + ":" + this.options.clientSecret);
        let self = this;
        const auth = "Basic " + encodedStr;
        return makeRequest('api.ebay.com', '/identity/v1/oauth2/token', 'POST', this.options.body, auth).then((result) => {
            let resultJSON = JSON.parse(result);
            console.log(resultJSON);
            self.setAccessToken(resultJSON.access_token);
            return resultJSON;
        });
    },
    getItem,
    getItemByLegacyId,
    getItemByItemGroup,
    searchItems
};

module.exports = Ebay;
