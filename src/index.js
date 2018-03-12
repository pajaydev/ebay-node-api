//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, please provide the input");
    if (!options.clientID) throw Error("Client ID is Missing\ncheck documentation to get Client ID http://developer.ebay.com/DevZone/account/");
    this.options = options;
}

Ebay.prototype.findItemsByKeywords = () => {
    console.log("find item by keyword");
}

module.exports = Ebay;