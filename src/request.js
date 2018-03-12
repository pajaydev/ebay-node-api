const https = require("https");
_cb_findItemsByKeywords = (root) => {
    console.log("inside data");
    console.log(root);
}

let makeRequest = function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {

                resolve(body);
            });
        });
    })

}



makeRequest("https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=Ajaykuma-nodeapi-PRD-bf1a91299-ed4deb45&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=iPhone&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0").then((data) => {
    console.log("success");
    // _cb_findItemsByKeywords(data);
    //callback(data);
    //data();
}, (error) => {
    console.log(error);
})
module.exports = makeRequest;