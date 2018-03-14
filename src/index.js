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

Ebay.prototype._cb_findItemsByKeywords = function (data) {
    console.log("dataaaaa");
}

Ebay.prototype.findItemsByKeywords = function (keyword) {
    console.log("find item by keyword");
    console.log(this);
    this.options.name = keyword;
    let url = this.buildAPIUrl(keyword);
    console.log(url);
    makeRequest(url).then((data) => {
        //console.log(data);
        let dataArray = data.split(configData["findItemsByKeywords"]["callback"] + "(");
        console.log(typeof dataArray[1]);
        let result = dataArray[1].substring(0, dataArray[1].length - 1);
        console.log(result);
        //return result;
    }, (error) => {
        console.log(error);
    })

}

Ebay.prototype.buildAPIUrl = function (keyword) {
    let base_url = "https://svcs.ebay.com/services/search/FindingService/v1?";
    base_url += "SECURITY-APPNAME=" + this.options.clientID;
    base_url += "&OPERATION-NAME=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
    base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON";
    base_url += "&callback=" + configData["findItemsByKeywords"]["callback"];
    base_url += "&REST-PAYLOAD&keywords=" + keyword;
    base_url += "&paginationInput.entriesPerPage=" + this.options.limit;
    base_url += "&GLOBAL-ID=" + this.options.globalID;

    return base_url;
};

module.exports = Ebay;
