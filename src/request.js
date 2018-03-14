const https = require("https");

let makeRequest = function makeRequest(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                console.log(body);
                resolve(body);

            });
        });
    })

}

module.exports = makeRequest;