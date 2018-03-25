const https = require("http");

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


let base64Encode = (encodeData) => {
    let buff = new Buffer(encodeData);
    return buff.toString('base64');
}

module.exports = { makeRequest, base64Encode };