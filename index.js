//let baseURL = "http://svcs.ebay.com/services/search/FindingService/v1";
function Ebay(options) {
    console.log(options);

    if (!options) throw new Error("Options is missing, pass the options");
}

module.exports = Ebay;