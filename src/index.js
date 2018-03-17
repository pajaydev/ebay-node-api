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
        let url = urlObject.buildSearchUrl(this.options, keyword);
        console.log(url);
        return makeRequest(url).then((data) => {
            let result = JSON.parse(data);
            return result["findItemsByKeywordsResponse"];

        }, (error) => {
            console.log(error);
        })

    },

    getAllCategories: function () {
        //console.log(url);
        return makeRequest("http://open.api.ebay.com/Shopping?callname=GetCategoryInfo&appid=" + this.options.clientID + "&version=967&siteid=0&CategoryID=-1&responseencoding=JSON&IncludeSelector=ChildCategories").then((data) => {
            let result = JSON.parse(data);
            return result;
        }, (error) => {
            console.log(error);
        })
    }

};

module.exports = Ebay;
