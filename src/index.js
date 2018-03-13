//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
let configData = require('./config');

console.log(configData["findItemsByKeywords"]["OPERATION-NAME"]);
function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, please provide the input");
    if (!options.clientID) throw Error("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    this.options = options;
    this.options.globalID = options.countryCode || "EBAY-US";
    this.options.keyword = "iphone";
}

Ebay.prototype.findItemsByKeywords = (keyword) => {
    console.log("find item by keyword");
    this.options.name = keyword;
}

Ebay.prototype.buildAPIUrl = function () {
    let base_url = "https://svcs.ebay.com/services/search/FindingService/v1?";
    base_url += "SECURITY-APPNAME=" + this.options.clientID;
    base_url += "&OPERATION-NAME=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
    base_url += "&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON";
    base_url += "&callback=" + configData["findItemsByKeywords"]["OPERATION-NAME"];
    base_url += "&REST-PAYLOAD&keywords=" + this.options.keyword;
    return base_url;
};

module.exports = Ebay;
