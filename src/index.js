//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
let configData = require('./config');
let makeRequest = require('./request');

function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, please provide the input");
    if (!options.clientID) throw Error("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    this.options = options;
    this.options.globalID = options.countryCode || "EBAY-US";
    this.options.keyword = "iphone";
}

Ebay.prototype = {
    buildAPIUrl: function (keyword) {
        let base_url = "http://svcs.ebay.com/services/search/FindingService/v1?";
        base_url += "SECURITY-APPNAME=" + this.options.clientID;
        base_url += "&OPERATION-NAME=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
        base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON";
        base_url += "&REST-PAYLOAD&keywords=" + keyword;
        base_url += "&paginationInput.entriesPerPage=" + this.options.limit;
        base_url += "&GLOBAL-ID=" + this.options.globalID;

        return base_url;
    },

    findItemsByKeywords: function (keyword) {
        this.options.name = keyword;
        let url = this.buildAPIUrl(keyword);
        //console.log(url);
        return makeRequest(url).then((result) => {
            console.log(result);
            return result;

        }, (error) => {
            console.log(error);
        })

    },

    getAllCategories: function () {
        //console.log(url);
        return makeRequest("http://open.api.ebay.com/Shopping?callname=GetCategoryInfo&appid=" + this.options.clientID + "&version=967&siteid=0&CategoryID=-1&responseencoding=JSON&IncludeSelector=ChildCategories").then((data) => {
            // console.log(data);
            return data;
        }, (error) => {
            console.log(error);
        })
    }

};

module.exports = Ebay;
